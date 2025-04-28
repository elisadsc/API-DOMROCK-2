import pandas as pd

# Carrega os dois arquivos
df_embeds = pd.read_csv("alzheimers_chunks_with_embeddings.csv")
df_traduzido = pd.read_csv("alzheimers_chunks_traduzido.csv")

# Substitui a coluna 'chunk' do arquivo com embeddings pelo texto traduzido
df_embeds["chunk"] = df_traduzido["chunk"]

# Salva novo CSV combinado
df_embeds.to_csv("alzheimers_chunks_traduzido_completo.csv", index=False)

print("✅ Arquivo final salvo como alzheimers_chunks_traduzido_completo.csv")
