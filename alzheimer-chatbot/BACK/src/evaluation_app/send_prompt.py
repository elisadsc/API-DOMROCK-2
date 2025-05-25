from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import uuid
from . import models, llm_interface, schemas
from .db import SessionLocal
from datetime import datetime

# Função que inicia a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rota para enviar o prompt e armazenar a resposta
router = APIRouter()

@router.post("/prompt")
def send_prompt(data: schemas.PromptIn, db: Session = Depends(get_db)):
    prompt_id = str(uuid.uuid4())
    new_prompt = models.Prompt(id=prompt_id, text=data.prompt)
    db.add(new_prompt)
    db.commit()

    # Chama a função que busca as respostas do LLM
    responses = llm_interface.get_llm_responses(data.prompt)
    result = []

    for r in responses:
        if isinstance(r, dict):
            new_response = models.LLMResponse(
                id=r["id"],
                prompt_id=prompt_id,
                llm_name=r["llm_name"],
                text=r["text"]
            )
            db.add(new_response)
            result.append(r)
    db.commit()

    # Salvando o histórico de chat
    for r in responses:
        new_chat_history = models.ChatHistory(
            id=str(uuid.uuid4()),
            user_input=data.prompt,
            bot_response=r["text"],
            timestamp=str(datetime.now())  # Salva o timestamp
        )
        db.add(new_chat_history)
    
    db.commit()

    return {"responses": result}
