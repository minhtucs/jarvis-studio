from sqlalchemy import Column, Integer, String, DateTime, UUID
from app.db import Base

class Message(Base):
    __tablename__ = 'message'

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    role = Column(String)
    conversation_id = Column(UUID, index=True)
    created_at = Column(DateTime)