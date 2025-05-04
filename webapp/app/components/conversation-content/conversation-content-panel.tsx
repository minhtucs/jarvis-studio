import ConversationContent from "./conversation-content";
import MessageInput from "./message-input";
import { useContext } from "react";
import { ConversationsContext } from "@/app/context/AppContext";

export default function ConversationContentPanel() {

  const conversationsState = useContext(ConversationsContext);

  return (
    <div className="flex flex-col h-full">
      <div id="conv-content-header" className="border-b-1 border-stone-300 p-3">
        <div>
          <span>{conversationsState.conversationActive?.title}</span>
        </div>
      </div>

      <div id="conv-content" className="flex flex-1 flex-col-reverse overflow-y-auto">
        <ConversationContent />
      </div>

      <div id="message-input-box" className="w-full p-4">
        <MessageInput />
      </div>
    </div>
  );
}