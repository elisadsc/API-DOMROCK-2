from pydantic import BaseModel
from uuid import UUID
from typing import List, Optional

class LLMResponseOut(BaseModel):
    id: str
    llm_name: str
    text: str

    class Config:
        from_attributes = True

class PromptIn(BaseModel):
    prompt: str

    class Config:
        from_attributes = True

class EvaluationIn(BaseModel):
    llm_response_1_id: str
    llm_response_2_id: str
    scores_1: List[float]
    scores_2: List[float]
    preferred: Optional[str] = None
    justification: Optional[str] = None

    class Config:
        from_attributes = True

class ChatHistoryIn(BaseModel):
    user_input: str
    bot_response: str

    class Config:
        from_attributes = True

class UserFeedbackIn(BaseModel):
    chat_history_id: str
    feedback: str

    class Config:
        from_attributes = True

class EvaluationCreate(BaseModel):
    message_id: UUID
    selected_response_id: UUID
    coherence: int
    clarity: int
    relevance: int
    usefulness: int
    trustworthiness: int
    justification: str
