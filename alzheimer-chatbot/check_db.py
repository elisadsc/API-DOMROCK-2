from BACK.src.evaluation_app.db import SessionLocal
from BACK.src.evaluation_app.models import Prompt, LLMResponse, Evaluation, Chunk

db = SessionLocal()

print("\n🔍 PROMPTS:")
for p in db.query(Prompt).all():
    print(f"- {p.id} | {p.text[:60]}...")

print("\n📄 RESPOSTAS LLM:")
for r in db.query(LLMResponse).all():
    print(f"- {r.id} | {r.llm_name} | texto: {r.text[:60]}...")

print("\n🗂️ AVALIAÇÕES:")
for e in db.query(Evaluation).all():
    print(f"- Preferido: {e.preferred} | Justificativa: {e.justification[:50]}...")

print("\n📚 CHUNKS:")
for c in db.query(Chunk).limit(3):
    print(f"- {c.id} | PubMed: {c.pubmed_id} | Texto: {c.chunk[:50]}...")

db.close()
