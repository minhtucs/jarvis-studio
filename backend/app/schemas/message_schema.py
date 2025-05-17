from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class MessageSchema(BaseModel):
    id: int
    content: str
    role: str
    conversation_id: UUID
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True