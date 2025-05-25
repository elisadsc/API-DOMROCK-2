from src.evaluation_app.db import Base, engine
from src.evaluation_app.models import database_models

print("📦 Criando todas as tabelas...")
Base.metadata.create_all(bind=engine)
print("✅ Tabelas criadas com sucesso!")
