import { useContext } from "react"
import { Conversation } from "../../model/conversation"
import { ConversationsContext, ConversationsDispatchContext } from "@/app/context/AppContext"

export default function ConversationItem({
  conversation
}: {
  conversation: Conversation
}) {
  const conversationsState = useContext(ConversationsContext);
  const conversationsDispatch = useContext(ConversationsDispatchContext);

  return (
    <div 
      className={`flex pl-4 pt-2 pb-2 border-b-1 border-slate-100 m-2 hover:cursor-pointer hover:bg-stone-200 hover:rounded-lg ${
        conversationsState.conversationActive?.id === conversation.id ? 'bg-stone-200 rounded-lg' : ''
      }`}
      onClick={() => conversationsDispatch({type: 'SET_CONVERSATION_ACTIVE', conversation: conversation})}
    >
      <p>{conversation.title}</p>
    </div>
  )
}