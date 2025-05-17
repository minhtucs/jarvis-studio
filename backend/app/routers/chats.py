from fastapi import APIRouter
from app.services.llm_service import LLMService, MessageRequest

router = APIRouter()
llmService = LLMService()

@router.post('/api/chat')
def chat(request: MessageRequest):
  # handle error, logging
  return llmService.send_message(request)