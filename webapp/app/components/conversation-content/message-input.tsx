'use client';

import { Message } from "@/app/model/message";
import { useContext, useState } from "react"
import { ConversationsDispatchContext } from "@/app/context/AppContext";
import { Role } from "@/app/model/role";
import { MessageService } from "@/app/services/message-service";
import { ConversationService } from "@/app/services/conversation-services";

export default function MessageInput() {

  const [messageContent, setMessageContent] = useState<string>("");
  const conversationsDispatch = useContext(ConversationsDispatchContext);

  const conversationService = new ConversationService();
  const messageService = new MessageService();

  async function handleSendMessage() {
    const messageId = conversationService.generateMessageId();
    const message: Message = { id: messageId, content: messageContent, role: Role.User, createdAt: new Date() };
    
    conversationsDispatch({type: 'NEW_USER_MESSAGE', message: message});
    setMessageContent(""); // clean input box
    // TODO disable message input box of current conversation

    try {
      const respMessage: Message = await messageService.sendMessage(message.content);
      console.log('llm response', respMessage);
      // TODO handle request error
      conversationsDispatch({type: 'LLM_RESPONSE_MESSAGE', message: respMessage});
      // TODO enable message input box
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border-1 border-stone-400 rounded-3xl focus:border-2 focus:border-emerald-600">
      <textarea 
        className="w-[calc(100%-2rem)] m-4 border-transparent focus:border-transparent focus:outline-none" 
        placeholder="Enter message..."
        value={messageContent}
        onChange={evt => setMessageContent(evt.target.value)}
        onKeyDown={evt => {
          if (evt.key === "Enter" && !evt.shiftKey) {
            evt.preventDefault(); // Prevents adding a new line
            evt.stopPropagation(); // Prevents bubbling
            handleSendMessage();
          }
        }}
      />

      <div id='input-control' className="flex flex-row justify-between m-4">
        <div className="flex flex-row gap-3">
          <button className="border-1 border-stone-400 rounded-lg p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
            </svg>
          </button>
          <button className="border-1 border-stone-400 rounded-lg p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
        </div>
        <button 
          className="border-1 border-stone-400 rounded-lg p-1 hover:cursor-pointer hover:text-blue-500"
          onClick={evt => handleSendMessage()}
          disabled={messageContent.trim().length === 0}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}