from app.db import get_pool
from app.models.conversation import Conversation

MAX_PAGE_SIZE = 100

class ConversationService:
  
  def list_conversations(self, userId: int) -> list[Conversation]:
    conversations: list[Conversation] = []
    with get_pool().connection() as conn:
      with conn.cursor() as cur:
        cur.execute("""
                    SELECT id, title, user_id, created_at, last_modified_at 
                    FROM conversation
                    WHERE user_id = %s
                    ORDER BY last_modified_at DESC
                    LIMIT %s
                    """, (userId, MAX_PAGE_SIZE))
        rows = cur.fetchall()
        for row in rows:
          conversations.append(self.row2conversation(row))
    return conversations
  
  def row2conversation(self, row) -> Conversation:
    return Conversation(
      id = row[0], 
      title=row[1], 
      user_id=row[2], 
      created_at=row[3], 
      last_modified_at=row[4])