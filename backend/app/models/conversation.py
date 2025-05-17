from sqlalchemy import Column, Integer, String, DateTime, UUID
from app.db import Base

class Conversation(Base):
    __tablename__ = 'conversation'

    id = Column(UUID, primary_key=True, index=True)
    title = Column(String)
    user_id = Column(Integer, index=True)
    created_at = Column(DateTime)
    last_modified_at = Column(DateTime)