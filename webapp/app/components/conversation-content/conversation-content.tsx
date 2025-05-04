import MessageItem from "./message-item"
import { useEffect, useRef, useContext } from "react";
import { ConversationsContext } from "@/app/context/AppContext";


export default function ConversationContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  const conversationsState = useContext(ConversationsContext);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [conversationsState.conversationActive?.messages]);

  return (
    <div ref={contentRef} className="flex flex-col-reverse p-4 overflow-y-auto">
      {conversationsState.conversationActive?.messages?.map(message =>
        <MessageItem key={message.id} message={message} />
      )}
    </div>
  )
}