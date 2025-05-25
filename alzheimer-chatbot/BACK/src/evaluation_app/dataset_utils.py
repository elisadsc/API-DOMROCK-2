import pandas as pd
from sentence_transformers import SentenceTransformer, util
import os

# Caminho do dataset
dataset_path = r"C:\API-DOMROCK-2\alzheimer-chatbot\DATASET\alzheimers_chunks_traduzido_completo.csv"

# Carregar o dataset
df = pd.read_csv(dataset_path)

# Verifica se a coluna "text" existe
if 'text' not in df.columns:
    raise ValueError("O arquivo CSV deve ter uma coluna chamada 'text' com os resumos.")

# Carrega o modelo de embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

# Embeddings dos resumos
abstracts_embeddings = model.encode(df['text'].tolist(), convert_to_tensor=True)

def search_recommendations(situation: str, top_k=3):
    """
    Busca recomendações no dataset com base na situação descrita.
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
    Lista ferramentas e abordagens práticas mencionadas nos resumos.
    """
    resource_keywords = ["treinamento", "programa", "intervenção", "atividade", "técnica", "método", "reabilitação", "ferramenta", "terapia"]
    resource_list = []

    for abstract in df['text']:
        for keyword in resource_keywords:
            if keyword.lower() in abstract.lower():
                resource_list.append(abstract)
                break

    return resource_list

def extract_low_efficacy_strategies():
    """
    Retorna uma lista de resumos que mencionam estratégias com baixa eficácia.
    """
    negative_keywords = [
        "não foi eficaz",
        "sem resultados",
        "não houve melhora",
        "baixo impacto",
        "ineficaz",
        "falhou",
        "não funcionou",
        "não teve efeito",
        "não apresentou melhora"
    ]

    low_efficacy_results = []

    for abstract in df['text']:
        for keyword in negative_keywords:
            if keyword.lower() in abstract.lower():
                low_efficacy_results.append(abstract)
                break

    return low_efficacy_results
