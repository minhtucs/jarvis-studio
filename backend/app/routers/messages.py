from app.services.message_service import MessageService, ChatRequest, ChatResponse
from fastapi import APIRouter, Query, status, HTTPException
from uuid import UUID
from app.context import AppContext
from app.models.message import Message

router = APIRouter()
message_service = MessageService()

@router.post('/api/messages/chat')
def chat(request: ChatRequest) -> ChatResponse:
  # TODO validate request
  user = AppContext.get_current_user()
  # TODO handle error
  resp = message_service.chat(request, user.id)
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