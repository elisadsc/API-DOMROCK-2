import pandas as pd
import os
from sentence_transformers import SentenceTransformer, util

# Caminho correto para o seu dataset
dataset_path = r"C:\API-DOMROCK-2\alzheimer-chatbot\DATASET\alzheimers_chunks_traduzido_completo.csv"

# Carregar o dataset
df = pd.read_csv(dataset_path)

# Checa se existe a coluna certa
if 'text' not in df.columns:
    raise ValueError("O arquivo CSV deve ter uma coluna chamada 'text' com os resumos.")

# Carrega o modelo de embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

# Embeddings dos resumos
abstracts_embeddings = model.encode(df['text'].tolist(), convert_to_tensor=True)

def search_recommendations(situation: str, top_k=3):
    """
    Busca recomendações práticas no dataset para a situação descrita.
    """
    situation_embedding = model.encode(situation, convert_to_tensor=True)
    hits = util.semantic_search(situation_embedding, abstracts_embeddings, top_k=top_k)[0]
    
    results = []
    for hit in hits:
        abstract = df.iloc[hit['corpus_id']]['text']
        results.append({
            "abstract": abstract,
            "score": hit['score']
        })
    return results

def extract_resources():
    """
    Lista ferramentas e abordagens práticas citadas nos resumos.
    """
    resource_keywords = ["treinamento", "programa", "intervenção", "atividade", "técnica", "método", "reabilitação", "ferramenta", "terapia"]
    
    resource_list = []
    for abstract in df['text']:
        for keyword in resource_keywords:
            if keyword.lower() in abstract.lower():
                resource_list.append(abstract)
                break
    
    return resource_list
