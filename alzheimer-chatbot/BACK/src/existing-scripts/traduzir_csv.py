import pandas as pd
from deep_translator import GoogleTranslator
import time

# Arquivo original
input_csv = "alzheimers_chunks_with_embeddings.csv"
output_csv = "alzheimers_chunks_traduzido.csv"

# Carrega CSV
df = pd.read_csv(input_csv)

# Verifica se coluna 'chunk' existe
if "chunk" not in df.columns:
    raise Exception("A coluna 'chunk' não foi encontrada no CSV.")

# Cria nova coluna para traduções
df["chunk_pt"] = ""

# Traduz cada chunk
for i, row in df.iterrows():
    texto = str(row["chunk"])
    try:
        traducao = GoogleTranslator(source="auto", target="pt").translate(texto)
        df.at[i, "chunk_pt"] = traducao
        print(f"✅ Traduzido chunk {i+1}/{len(df)}")
        time.sleep(1)  # Evita bloqueio da API
    except Exception as e:
        print(f"❌ Erro no chunk {i+1}: {e}")
        df.at[i, "chunk_pt"] = ""

# Salva novo CSV
df.to_csv(output_csv, index=False)
print(f"\n✅ Tradução finalizada! Arquivo salvo como: {output_csv}")
