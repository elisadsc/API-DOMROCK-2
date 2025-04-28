from sqlalchemy import Column, String, Integer, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base

class Chunk(Base):
    __tablename__ = "chunks"
    id = Column(Integer, primary_key=True, index=True)
    pubmed_id = Column(String)
    chunk_idx = Column(Integer)
    chunk = Column(Text)

class Prompt(Base):
    __tablename__ = "prompts"
    id = Column(String, primary_key=True, index=True)
    text = Column(Text)
    chunk_id = Column(Integer, ForeignKey("chunks.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class LLMResponse(Base):
    __tablename__ = "llm_responses"
    id = Column(String, primary_key=True, index=True)
    prompt_id = Column(String, ForeignKey("prompts.id"))
    llm_name = Column(String)
    text = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class Evaluation(Base):
    __tablename__ = "evaluations"
    id = Column(String, primary_key=True, index=True)
    llm_response_1_id = Column(String, ForeignKey("llm_responses.id"))
    llm_response_2_id = Column(String, ForeignKey("llm_responses.id"))
    scores_1 = Column(JSON)
    scores_2 = Column(JSON)
    preferred = Column(String)
    justification = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
