import ConversationItem from "./conversation-item"
import { Conversation } from "../../model/conversation"
import { ConversationsContext, ConversationsDispatchContext } from "@/app/context/AppContext";
import { useContext } from "react";
import { useAddConversation } from "@/app/hooks/hooks";

export default function ConversationListPanel() {

  const conversationsState = useContext(ConversationsContext);
  const conversationsDispatch = useContext(ConversationsDispatchContext);

  const addConversation = useAddConversation();

  function handleAddConversation() {
    const conversationAdded = addConversation({ title: "New conversation" });
    conversationsDispatch({type: 'ADD_CONVERSATION', conversation: conversationAdded});
  }

  return (
    <>
      <div id='conv-list-header' className="flex flex-row justify-between items-center p-4 gap-2">
        <input type="text" className="w-full border-1 border-stone-400 rounded-xl p-1 pl-2" placeholder="Search..."/>

        <button 
          className="border-1 border-stone-400 rounded-xl p-1 hover:cursor-pointer hover:text-blue-500 hover:border-blue-500"
          onClick={e => handleAddConversation()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      
      <div id='conv-items'>
        {conversationsState.conversationList.map(conv => 
          <ConversationItem 
            key={conv.id} 
            conversation={conv}
            />
        )}
      </div>
    </>
  )
}