from sqlalchemy import text
from app.models.conversation import Conversation
from app.db import SessionLocal

MAX_PAGE_SIZE = 100

class ConversationService:

  def create_conversation(self, conversation: Conversation, user_id: int) -> Conversation:
    conversation.user_id = user_id
    
    with SessionLocal() as session:
      result = session.add(conversation)
      session.commit()
      session.refresh(conversation)
      return conversation
  
  def list_conversations(self, user_id: int) -> list[Conversation]:
    sql = text("""
      SELECT id, title, user_id, created_at, last_modified_at 
      FROM conversation
      WHERE user_id = :userId
      ORDER BY last_modified_at DESC
      LIMIT :pageSize
    """)

    with SessionLocal() as session:
      result = session.execute(sql, {'userId': user_id, 'pageSize': MAX_PAGE_SIZE})
      rows = result.fetchall()

      print(f"conversations_count {result.rowcount}")
      print(f"rows {rows}")
      
      # [Conversation(**row) for row in rows]
      return [Conversation(
        id=row.id,
        title=row.title,
        user_id=row.user_id,
        created_at=row.created_at,
        last_modified_at=row.last_modified_at
      ) for row in rows]