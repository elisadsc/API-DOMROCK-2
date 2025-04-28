from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import uuid
from . import models, schemas, llm_interface
from .db import SessionLocal, engine

from dotenv import load_dotenv  
load_dotenv()                   

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/prompt")
def send_prompt(data: schemas.PromptIn, db: Session = Depends(get_db)):
    prompt_id = str(uuid.uuid4())
    new_prompt = models.Prompt(id=prompt_id, text=data.prompt)
    db.add(new_prompt)
    db.commit()

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
    return {"responses": result}

@app.post("/evaluate")
def evaluate(data: schemas.EvaluationIn, db: Session = Depends(get_db)):
    new_eval = models.Evaluation(
        id=str(uuid.uuid4()),
        llm_response_1_id=data.llm_response_1_id,
        llm_response_2_id=data.llm_response_2_id,
        scores_1=data.scores_1,
        scores_2=data.scores_2,
        preferred=data.preferred,
        justification=data.justification
    )
    db.add(new_eval)
    db.commit()
    return {"status": "ok"}

@app.post("/recommendations")
def get_recommendations(data: schemas.PromptIn):
    """
    RF2: Recomendações práticas para situações cotidianas com o idoso
    """
    from .dataset_utils import search_recommendations

    situation = data.prompt
    recommendations = search_recommendations(situation)
    return {"recommendations": recommendations}


@app.get("/resources")
def list_resources():
    """
    RF5: Listagem de ferramentas e abordagens mencionadas nos resumos
    """
    from .dataset_utils import extract_resources

    resources = extract_resources()
    return {"resources": resources}
