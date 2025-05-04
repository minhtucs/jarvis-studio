from datetime import datetime
from pydantic import BaseModel

class Conversation(BaseModel):
  id: int
  title: str
  user_id: int
  created_at: datetime
  last_modified_at: datetime