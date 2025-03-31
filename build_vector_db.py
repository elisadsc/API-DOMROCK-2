import pandas as pd
import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

# Carrega os dados do CSV com os chunks
df = pd.read_csv("C:/API-DOMROCK-2/alzheimer-chatbot/alzheimers_chunks_traduzido_completo.csv")

# Inicializa o cliente persistente
chroma_client = chromadb.PersistentClient(path="chroma_db")

# Função de embedding usando Sentence Transformers
embedding_function = SentenceTransformerEmbeddingFunction(model_name="all-distilroberta-v1")

# Conecta ou cria a coleção no Chroma DB
collection = chroma_client.get_or_create_collection(
    name="alzheimers_final",
    embedding_function=embedding_function
)

# Limpa a coleção existente para evitar duplicatas
chroma_client.delete_collection(name="alzheimers_final")
collection = chroma_client.create_collection(
    name="alzheimers_final",
    embedding_function=embedding_function
)

# Adiciona os documentos ao Chroma DB usando a coluna 'chunk'
for idx, row in df.iterrows():
    chunk = str(row["chunk"])
    if chunk and chunk != "nan":
        # Usa pubmed_id e chunk_idx como identificador único
        doc_id = f"{row['pubmed_id']}_{row['chunk_idx']}"
        collection.add(
            documents=[chunk],
            ids=[doc_id]
        )
print(f"📦 Total de documentos adicionados: {collection.count()}")
