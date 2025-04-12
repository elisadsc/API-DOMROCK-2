import pandas as pd

df = pd.read_csv("alzheimers_chunks_with_embeddings.csv")

print(f"Total de chunks: {len(df)}\n")

for i in range(3):
    print(f"🔹 Chunk {i+1}:\n{df.iloc[i]['chunk']}\n")
