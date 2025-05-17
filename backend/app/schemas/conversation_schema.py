from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class ConversationSchema(BaseModel):
    id: UUID
    title: str
    userId: Optional[int] = None
    createdAt: Optional[datetime] = None
    lastModifiedAt: Optional[datetime] = None

    class Config:
        from_attributes = True