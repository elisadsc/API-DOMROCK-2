import spacy
import pandas as pd
from typing import List
from sentence_transformers import SentenceTransformer
import numpy as np
from tqdm import tqdm  # Barra de progresso

# Carregar o modelo do SpaCy para inglês
nlp = spacy.load("en_core_web_sm")

# Carregar o modelo de embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

def split_into_chunks(text: str, chunk_size: int = 100, overlap: int = 20) -> List[str]:
    doc = nlp(text)
    sentences = [sent.text for sent in doc.sents]
    
    chunks = []
    current_chunk = []
    current_length = 0

    for sentence in sentences:
        sentence_length = len(sentence.split())
        if current_length + sentence_length > chunk_size and current_chunk:
            chunks.append(" ".join(current_chunk))
            overlap_words = " ".join(current_chunk[-overlap//10:]) if overlap > 0 else ""
            current_chunk = [overlap_words, sentence] if overlap > 0 else [sentence]
            current_length = len(overlap_words.split()) + sentence_length
        else:
            current_chunk.append(sentence)
            current_length += sentence_length

    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks

# Carregar o CSV com os abstracts (apenas 100 linhas para teste mais leve)
df = pd.read_csv("alzheimers.csv").head(100)

# Preencher valores ausentes na coluna 'abstract' com o 'title' ou uma string padrão
df["abstract"] = df.apply(
    lambda row: row["title"] if pd.isna(row["abstract"]) or not isinstance(row["abstract"], str) else row["abstract"],
    axis=1
)
df["abstract"] = df["abstract"].fillna("Abstract não disponível")

# Processar cada abstract e dividir em chunks, com barra de progresso
all_chunks = []
for idx, row in tqdm(df.iterrows(), total=len(df), desc="Processando abstracts"):
    abstract = row["abstract"]
    pubmed_id = row["pubmed_id"]
    chunks = split_into_chunks(abstract)
    for chunk_idx, chunk in enumerate(chunks):
        embedding = model.encode(chunk).tolist()
        all_chunks.append({
            "pubmed_id": pubmed_id,
            "chunk_idx": chunk_idx,
            "chunk": chunk,
            "embedding": embedding
        })

# Salvar os chunks e embeddings em um novo CSV
chunks_df = pd.DataFrame(all_chunks)
chunks_df.to_csv("alzheimers_chunks_with_embeddings.csv", index=False)
print("Chunks e embeddings salvos em alzheimers_chunks_with_embeddings.csv")
