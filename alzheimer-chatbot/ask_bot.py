import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction
from deep_translator import GoogleTranslator

# Tradutores
pt_to_en = GoogleTranslator(source='pt', target='en')
en_to_pt = GoogleTranslator(source='en', target='pt')

# Inicializa o cliente persistente (deve bater com o path do build_vector_db.py)
chroma_client = chromadb.PersistentClient(path="chroma_db")

# Função de embedding (mesma do build_vector_db.py)
embedding_function = SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

# Conecta à coleção existente
collection = chroma_client.get_or_create_collection(
    name="alzheimers_final",
    embedding_function=embedding_function
)

print(f"📦 Total de documentos na coleção: {collection.count()}\n")
print("Chatbot Alzheimer 🤖 (Digite 'sair' para encerrar)\n")

while True:
    pergunta_pt = input("Cuidador: ").strip()
    if pergunta_pt.lower() == "sair":
        break

    try:
        # Traduz a pergunta para inglês e aplica reforço com palavras-chave
        pergunta_en = pt_to_en.translate(pergunta_pt).lower().strip()

        reforcos = {
            "sintomas": "cognitive decline memory loss disorientation",
            "tratamento": "donepezil rivastigmine galantamine memantine therapy",
            "cuidados": "caregiver support routine behavior management"
        }

        for chave, termos in reforcos.items():
            if chave in pergunta_pt.lower():
                pergunta_en += " " + termos

        # Faz a consulta
        resultados = collection.query(
            query_texts=[pergunta_en],
            n_results=3
        )

        documentos = resultados.get("documents", [[]])[0]

        if documentos and any(doc.strip() for doc in documentos):
            print("\n📚 Resposta baseada nos resumos científicos:\n")
            for i, doc in enumerate(documentos, 1):
                resposta_pt = en_to_pt.translate(doc.strip())
                print(f"{i}. {resposta_pt}\n")
        else:
            print("⚠️ Nenhuma informação encontrada nos resumos.\n")

    except Exception as e:
        print("❌ Erro ao processar sua pergunta:", e)
