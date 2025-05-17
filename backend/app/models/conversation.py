from sqlalchemy import Column, Integer, String, DateTime, UUID
from app.db import Base
from sqlalchemy.sql import func

class Conversation(Base):
    __tablename__ = 'conversation'

    id = Column(UUID, primary_key=True, index=True)
    title = Column(String)
    userId = Column(Integer, name='user_id', index=True)
    createdAt = Column(DateTime, name='created_at', server_default=func.now())
    lastModifiedAt = Column(DateTime, name='last_modified_at', server_default=func.now(), onupdate=func.now())