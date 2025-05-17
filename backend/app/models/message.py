from sqlalchemy import Column, Integer, String, DateTime, UUID
from app.db import Base
from sqlalchemy.sql import func

class Message(Base):
    __tablename__ = 'message'

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    role = Column(String)
    conversationId = Column(UUID, name='conversation_id', index=True)
    userId = Column(Integer, name='user_id', index=True)
    createdAt = Column(DateTime, name='created_at', server_default=func.now())
