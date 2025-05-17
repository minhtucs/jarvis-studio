from sqlalchemy import text
from app.models.message import Message
from app.db import SessionLocal

MAX_PAGE_SIZE = 100

class MessageService:
  
  def list_messages(self, conversation_id: str, user_id: int) -> list[Message]:
    sql = text("""
      SELECT id, content, role, conversation_id, created_at
      FROM message
      WHERE conversation_id = :conversation_id and user_id = :user_id
      ORDER BY created_at DESC
      LIMIT :pageSize
    """)

    with SessionLocal() as session:
      result = session.execute(sql, {'conversation_id': conversation_id, 'user_id': user_id, 'pageSize': MAX_PAGE_SIZE})
      rows = result.fetchall()

      print(f"message_count {result.rowcount}")
      print(f"rows {rows}")
      
      return [Message(
        id=row.id,
        content=row.content,
        role=row.role,
        conversation_id=row.conversation_id,
        created_at=row.created_at
      ) for row in rows]