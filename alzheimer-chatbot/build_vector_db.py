import pandas as pd
import ast
import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

# Carrega os dados do CSV
df = pd.read_csv("alzheimers_chunks_with_embeddings.csv")
print(f"✅ Linhas no CSV: {len(df)}")

# Garante que os embeddings sejam listas (de string para lista real)
df["embedding"] = df["embedding"].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

# Inicializa o cliente persistente do Chroma
chroma_client = chromadb.PersistentClient(path="chroma_db")

# Define a função de embedding
embedding_function = SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

# Cria ou acessa a coleção com embeddings
collection = chroma_client.get_or_create_collection(
    name="alzheimers_final",
    embedding_function=embedding_function
)

# Remove tudo da coleção (limpeza antes de reindexar)
try:
    total_antigo = collection.count()
    collection.delete(where={"chunk_idx": {"$gte": 0}})
    print(f"🧹 Limpeza feita — {total_antigo} chunks apagados.")
except Exception as e:
    print(f"⚠️ Erro ao limpar coleção: {e}")

# Adiciona os chunks
success = 0
fails = 0

for idx, row in df.iterrows():
    try:
        collection.add(
            documents=[row["chunk"]],
            embeddings=[row["embedding"]],
            ids=[f"{row['pubmed_id']}_{row['chunk_idx']}"],
            metadatas=[{
                "pubmed_id": row["pubmed_id"],
                "chunk_idx": row["chunk_idx"]
            }]
        )
        success += 1
    except Exception as e:
        print(f"❌ Falha no chunk {idx}: {e}")
        fails += 1

# Resumo final
print(f"\n✅ Chunks adicionados: {success}")
print(f"❌ Falhas: {fails}")
print(f"📦 Total na coleção agora: {collection.count()}")
