from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uuid
from datetime import datetime

from src.evaluation_app import schemas, llm_interface
from src.evaluation_app.db import SessionLocal, Base, engine
from src.evaluation_app.models import database_models as models

app = FastAPI()

# ✅ Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Sessão com o banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Enviar Prompt
@app.post("/prompt")
def send_prompt(data: schemas.PromptIn, db: Session = Depends(get_db)):
    prompt_id = str(uuid.uuid4())
    print(f"🔹 Prompt recebido: {data.prompt}")

    new_prompt = models.Prompt(id=prompt_id, text=data.prompt)
    db.add(new_prompt)
    db.commit()

    responses = llm_interface.get_llm_responses(data.prompt)
    print(f"🔹 Respostas dos LLMs: {responses}")

    result = []

    for r in responses:
        new_response = models.LLMResponse(
            id=r["id"],
            prompt_id=prompt_id,
            llm_name=r["llm_name"],
            text=r["text"]
        )
        db.add(new_response)
        result.append(r)

        new_chat_history = models.ChatHistory(
            id=str(uuid.uuid4()),
            user_input=data.prompt,
            bot_response=r["text"],
            timestamp=datetime.now()
        )
        db.add(new_chat_history)

    db.commit()
    return {"responses": result}

# ✅ Enviar Feedback
@app.post("/feedback")
def submit_feedback(data: schemas.UserFeedbackIn, db: Session = Depends(get_db)):
    new_feedback = models.UserFeedback(
        id=str(uuid.uuid4()),
        chat_history_id=data.chat_history_id,
        feedback=data.feedback,
        timestamp=datetime.now()
    )
    db.add(new_feedback)
    db.commit()
    return {"message": "Feedback recebido com sucesso"}

# ✅ Avaliação simplificada — salva diretamente na tabela de histórico
@app.post("/evaluation/save")
def save_user_evaluation(data: schemas.EvaluationCreate, db: Session = Depends(get_db)):
    chat_history = db.query(models.ChatHistory).filter(models.ChatHistory.id == str(data.message_id)).first()
    
    if not chat_history:
        raise HTTPException(status_code=404, detail="Mensagem não encontrada")

    chat_history.evaluation_score = (
        data.coherence + data.clarity + data.relevance + data.usefulness + data.trustworthiness
    ) / 5
    chat_history.evaluation_justification = data.justification

    db.commit()
    return {"message": "Avaliação salva com sucesso"}

# ✅ Histórico
@app.get("/history")
def get_chat_history(db: Session = Depends(get_db)):
    history = db.query(models.ChatHistory).order_by(models.ChatHistory.timestamp.desc()).all()

    result = [
        {
            "user_input": h.user_input,
            "bot_response": h.bot_response,
            "timestamp": h.timestamp,
            "evaluation_score": h.evaluation_score,
            "evaluation_justification": h.evaluation_justification
        }
        for h in history
    ]
    return {"history": result}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.evaluation_app.main:app", host="127.0.0.1", port=8000, reload=True)
