from sqlalchemy import text
from app.models.message import Message
from app.db import SessionLocal
from app.services.llm_service import LLMService
from pydantic import BaseModel
from app.schemas.message_schema import MessageSchema

MAX_PAGE_SIZE = 100

class ChatResponse(BaseModel):
    assistant_message: MessageSchema

llm_service = LLMService()

class MessageService:

  def chat(self, user_message: Message, user_id: int) -> ChatResponse:
    resp_content = llm_service.send_message(user_message.content)
    
    assistant_message = self.save_message(Message(
      content=resp_content,
      role='assistant',
      conversationId=user_message.conversationId,
      userId=user_id
    ))
    
    return ChatResponse(
       assistant_message=MessageSchema.model_validate(assistant_message)
    )
  
  def save_message(self, message: Message) -> Message:
    with SessionLocal() as session:
      result = session.add(message)
      session.commit()
      session.refresh(message)
      return message
  
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
      
      return [Message(
        id=row.id,
        content=row.content,
        role=row.role,
        conversationId=row.conversation_id,
        createdAt=row.created_at
      ) for row in rows]