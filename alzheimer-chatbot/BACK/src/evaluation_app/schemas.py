from pydantic import BaseModel
from typing import Optional, List, Dict

class PromptIn(BaseModel):
    prompt: str
    chunk: Optional[str] = None

class LLMResponseOut(BaseModel):
    id: str
    llm_name: str
    text: str

class EvaluationIn(BaseModel):
    llm_response_1_id: str
    llm_response_2_id: str
    scores_1: Dict[str, int]
    scores_2: Dict[str, int]
    preferred: str
    justification: str
