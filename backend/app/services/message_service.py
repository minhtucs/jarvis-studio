from sqlalchemy import text
from app.models.message import Message
from app.db import SessionLocal
from app.services.llm_service import LLMService
from pydantic import BaseModel
from app.schemas.message_schema import MessageSchema
from uuid import UUID

MAX_PAGE_SIZE = 100

class ChatRequest(BaseModel):
    content: str
    conversation_id: UUID

class ChatResponse(BaseModel):
    user_message: MessageSchema
    assistant_message: MessageSchema

llm_service = LLMService()

class MessageService:

  def chat(self, chat_request: ChatRequest, user_id: int) -> ChatResponse:
    # save user message
    user_message = Message(
      content=chat_request.content,
      role='user',
      conversation_id=chat_request.conversation_id,
      user_id=user_id
    )
    user_message = self.save_message(user_message)

    # call LLM
    resp_content = llm_service.send_message(chat_request.content)
    assistant_message = Message(
      content=resp_content,
      role='assistant',
      conversation_id=chat_request.conversation_id,
      user_id=user_id
    )
    assistant_message = self.save_message(assistant_message)
    
    return ChatResponse(
       user_message=MessageSchema.model_validate(user_message), 
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

      print(f"message_count {result.rowcount}")
      print(f"rows {rows}")
      
      return [Message(
        id=row.id,
        content=row.content,
        role=row.role,
        conversation_id=row.conversation_id,
        created_at=row.created_at
      ) for row in rows]