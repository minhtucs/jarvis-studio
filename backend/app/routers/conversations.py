from fastapi import APIRouter
from app.services.conversation_service import ConversationService
from app.context import AppContext
from app.models.conversation import Conversation
from app.schemas.conversation_schema import ConversationSchema

router = APIRouter()
conversationService = ConversationService()

@router.post('/api/conversations')
def create_conversation(conversation: ConversationSchema):
  user = AppContext.get_current_user()
  conversation_model = Conversation(**conversation.model_dump())
  conversation_model = conversationService.create_conversation(conversation_model, user.id)
  return ConversationSchema.model_validate(conversation_model)

@router.get('/api/conversations')
def list_conversations():
  user = AppContext.get_current_user()
  return conversationService.list_conversations(user.id)