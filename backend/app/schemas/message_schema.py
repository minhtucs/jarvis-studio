from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class MessageSchema(BaseModel):
    id: Optional[int] = None
    content: str
    role: str
    conversationId: UUID
    userId: Optional[int] = None
    createdAt: Optional[datetime] = None

    class Config:
        from_attributes = True