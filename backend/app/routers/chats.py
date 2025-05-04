from fastapi import APIRouter
from app.services.chat_service import ChatService, MessageRequest

router = APIRouter()
chatservice = ChatService()

@router.post('/api/chat')
def chat(request: MessageRequest):
  # handle error, logging
  return chatservice.send_message(request)