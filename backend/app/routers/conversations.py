from fastapi import APIRouter
from app.services.conversation_service import ConversationService
from app.context import AppContext

router = APIRouter()
conversationService = ConversationService()

@router.get('/api/conversations')
def list_conversations():
  user = AppContext.get_current_user()
  return conversationService.list_conversations(user.id)