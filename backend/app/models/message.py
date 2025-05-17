from sqlalchemy import Column, Integer, String, DateTime, UUID
from app.db import Base
from sqlalchemy.sql import func

class Message(Base):
    __tablename__ = 'message'

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    role = Column(String)
    conversation_id = Column(UUID, index=True)
    user_id = Column(Integer, index=True)
    created_at = Column(DateTime, server_default=func.now())
