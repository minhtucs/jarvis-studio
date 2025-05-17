import { useContext } from "react"
import { Conversation } from "../../model/conversation"
import { ConversationsContext, ConversationsDispatchContext } from "@/app/context/AppContext"
import { MessageService } from "@/app/services/message-service"

export default function ConversationItem({
  conversation
}: {
  conversation: Conversation
}) {
  const conversationsState = useContext(ConversationsContext);
  const conversationsDispatch = useContext(ConversationsDispatchContext);

  const messageService = new MessageService();

  const handleActiveConversationChanged = async () => {
    // refresh latest messages
    conversation.messages = await messageService.getLatestMessages(conversation.id);
    conversationsDispatch({type: 'ACTIVE_CONVERSATION_CHANGED', conversation: conversation});
  }

  return (
    <div 
      className={`flex pl-4 pt-2 pb-2 border-b-1 border-slate-100 m-2 hover:cursor-pointer hover:bg-stone-200 hover:rounded-lg ${
        conversationsState.conversationActive?.id === conversation.id ? 'bg-stone-200 rounded-lg' : ''
      }`}
      onClick={handleActiveConversationChanged}
    >
      <p>{conversation.title}</p>
    </div>
  )
}