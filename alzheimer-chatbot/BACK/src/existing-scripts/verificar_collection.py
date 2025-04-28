import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

embedding_function = SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(
    name="alzheimers_final",
    embedding_function=embedding_function
)

# Lista quantos documentos foram adicionados
info = collection.count()
print(f"📊 Total de documentos na coleção: {info}")
