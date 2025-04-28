import pandas as pd
from sqlalchemy.orm import Session
from .db import SessionLocal, engine
from .models import Chunk
from . import models

# Criar as tabelas no banco de dados, caso não existam
models.Base.metadata.create_all(bind=engine)

# Carregar os dados
df = pd.read_csv("DATASET/alzheimers_chunks_traduzido_completo.csv")

def insert_chunks():
    db: Session = SessionLocal()
    for _, row in df.iterrows():
        db.add(Chunk(
            pubmed_id=row['pubmed_id'],
            chunk_idx=row['chunk_idx'],
            chunk=row['chunk']
        ))
    db.commit()
    db.close()
    print("Chunks importados com sucesso!")

if __name__ == "__main__":
    insert_chunks()
