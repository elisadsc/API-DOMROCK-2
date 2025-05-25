from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from src.evaluation_app.db import Base
from datetime import datetime
import uuid

class Prompt(Base):
    __tablename__ = 'prompts'
    id = Column(String, primary_key=True, index=True)
    text = Column(String)

class LLMResponse(Base):
    __tablename__ = 'llm_responses'
    id = Column(String, primary_key=True, index=True)
    prompt_id = Column(String)
    llm_name = Column(String)
    text = Column(String)

class ChatHistory(Base):
    __tablename__ = 'chat_history'
    id = Column(String, primary_key=True, index=True)
    user_input = Column(String)
    bot_response = Column(String)
    timestamp = Column(String)

    # Novas colunas:
    evaluation_score = Column(Float, nullable=True)
    evaluation_justification = Column(String, nullable=True)


class Evaluation(Base):
    __tablename__ = 'evaluations'
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))

    # Campos para avaliação comparativa
    llm_response_1_id = Column(String, nullable=True)
    llm_response_2_id = Column(String, nullable=True)
    scores_1 = Column(Float, nullable=True)
    scores_2 = Column(Float, nullable=True)
    preferred = Column(String, nullable=True)
    justification = Column(String, nullable=True)

    # Campos para avaliação individual
    message_id = Column(String, nullable=True)
    selected_response_id = Column(String, ForeignKey("llm_responses.id"), nullable=True)

    coherence = Column(Float, nullable=True)
    clarity = Column(Float, nullable=True)
    relevance = Column(Float, nullable=True)
    usefulness = Column(Float, nullable=True)
    trustworthiness = Column(Float, nullable=True)

    timestamp = Column(DateTime, default=datetime.utcnow)

class UserFeedback(Base):
    __tablename__ = 'user_feedback'
    id = Column(String, primary_key=True, index=True)
    chat_history_id = Column(String)
    feedback = Column(String)
    timestamp = Column(String)
