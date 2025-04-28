import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from deep_translator import GoogleTranslator
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# 🔁 Tradutores
pt_to_en = GoogleTranslator(source='pt', target='en')
en_to_pt = GoogleTranslator(source='en', target='pt')

# 📁 Caminho do ChromaDB
chroma_client = chromadb.PersistentClient(path="chroma_db")

# 🔠 Função de embedding
embedding_function = SentenceTransformerEmbeddingFunction(model_name="all-distilroberta-v1")

# 🧠 Conecta à coleção
collection = chroma_client.get_or_create_collection(
    name="alzheimers_final",
    embedding_function=embedding_function
)

# 📦 Verifica se há dados
if collection.count() == 0:
    print("⚠️ A coleção 'alzheimers_final' está vazia. Rode build_vector_db.py primeiro.")
    exit()

# ⚙️ Modelo
model_id = "tiiuae/falcon-rw-1b"
try:
    tokenizer = AutoTokenizer.from_pretrained(model_id, cache_dir="./hf_cache")
    tokenizer.pad_token = tokenizer.eos_token
    model = AutoModelForCausalLM.from_pretrained(model_id, cache_dir="./hf_cache")
    model.eval()
except Exception as e:
    print(f"❌ Erro ao carregar o modelo: {e}")
    exit()

# 🤖 Geração de resposta
def gerar_resposta(prompt):
    inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
    inputs = {k: v.to(model.device) for k, v in inputs.items()}

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=100,
            pad_token_id=tokenizer.eos_token_id,
            no_repeat_ngram_size=2
        )

    resposta = tokenizer.decode(output[0], skip_special_tokens=True)
    return resposta[len(prompt):].strip()

# 🟢 Interface
print(f"📦 Total de documentos na coleção: {collection.count()}")
print("Bem-vindo ao ALOIS CHAT! 👋 (Digite 'sair' para encerrar o chat)")

while True:
    pergunta_pt = input("Cuidador: ").strip()
    if pergunta_pt.lower() == "sair":
        print("👋 Até logo! O ALOIS CHAT foi encerrado.")
        break

    if not pergunta_pt:
        print("⚠️ Por favor, digite uma pergunta válida.\n")
        continue

    try:
        # 🔁 Tradução da pergunta
        pergunta_en = pt_to_en.translate(pergunta_pt)

        # 🔍 Busca vetorial
        resultados = collection.query(
            query_texts=[pergunta_en],
            n_results=3
        )

        documentos = resultados.get("documents", [[]])[0]
        distancias = resultados.get("distances", [[]])[0]

        print("[DEBUG] Documentos retornados:")
        for doc, dist in zip(documentos, distancias):
            print(f"- Distância: {dist:.2f} | Trecho: {doc[:80]}...")

        # 🔎 Seleciona o mais relevante
        contexto = documentos[0] if documentos else "No context found."

        prompt = (
            f"Context: {contexto}\n\n"
            f"Question: {pergunta_en}\n\n"
            f"Answer clearly, based only on the context above."
        )

        print("[DEBUG] Gerando resposta...")
        resposta_en = gerar_resposta(prompt)

        # 🔁 Tradução de volta
        try:
            resposta_pt = en_to_pt.translate(resposta_en)
        except:
            resposta_pt = resposta_en

        print(f"\n📚 Resposta baseada nos estudos e LLM:\n{resposta_pt}\n")

    except Exception as e:
        print(f"❌ Erro: {e}\n")
