import pandas as pd
import ast

df = pd.read_csv("alzheimers_chunks_with_embeddings.csv")

print(f"📄 Total de linhas no CSV: {len(df)}")

# Verifica conteúdo da coluna embedding
try:
    df["embedding"] = df["embedding"].apply(lambda x: ast.literal_eval(x))
    print("✅ Embeddings convertidos com sucesso (lista reconhecida).")
    print("📌 Exemplo:", df["embedding"].iloc[0][:5])
except Exception as e:
    print("❌ Erro ao converter embeddings:", e)

# Verifica se pubmed_id e chunk existem
print("🔎 Colunas:", df.columns.tolist())
print("📍 Primeira linha:\n", df.iloc[0])
