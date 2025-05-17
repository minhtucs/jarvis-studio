from app.services.message_service import MessageService, ChatResponse
from fastapi import APIRouter, Query, status, HTTPException
from uuid import UUID
from app.context import AppContext
from app.models.message import Message
from app.schemas.message_schema import MessageSchema

router = APIRouter()
message_service = MessageService()

@router.post('/api/messages')
def save_user_message(message: MessageSchema):
    """
    Save user message to the database.
    """
    # TODO validate request
    user = AppContext.get_current_user()
    message_model = Message(**message.model_dump())
    message_model.userId = user.id
    message_model = message_service.save_message(message_model)
    return MessageSchema.model_validate(message_model)

@router.post('/api/messages/chat')
def chat(user_message: MessageSchema) -> ChatResponse:
  # TODO validate request & handle errors
  user = AppContext.get_current_user()
  user_message_model = Message(**user_message.model_dump())
  resp = message_service.chat(user_message_model, user.id)
  return resp

@router.get('/api/messages')
def list_messages(conversation_id: UUID = Query(None)): # -> list[Message]:
    """
    List messages belong to a conversation.
    """
    user = AppContext.get_current_user()
    if conversation_id is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="conversation_id is required")
    
    return message_service.list_messages(conversation_id, user.id)