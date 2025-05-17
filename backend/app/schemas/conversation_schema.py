from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class ConversationSchema(BaseModel):
    id: UUID
    title: str
    user_id: Optional[int] = None
    created_at: Optional[datetime] = None
    last_modified_at: Optional[datetime] = None

    class Config:
        from_attributes = True