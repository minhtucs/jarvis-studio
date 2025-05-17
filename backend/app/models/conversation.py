from sqlalchemy import Column, Integer, String, DateTime, UUID
from app.db import Base
from sqlalchemy.sql import func

class Conversation(Base):
    __tablename__ = 'conversation'

    id = Column(UUID, primary_key=True, index=True)
    title = Column(String)
    user_id = Column(Integer, index=True)
    created_at = Column(DateTime, server_default=func.now())
    last_modified_at = Column(DateTime, server_default=func.now(), onupdate=func.now())