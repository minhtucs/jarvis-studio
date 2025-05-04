import { Conversation } from "../model/conversation";
import { Message } from "../model/message";
import { addConversation } from "../services/conversation-services";
import { chatWithLLM } from "../services/message-service";

export function useAddConversation() {

  // TODO: should merge with the service layer??
  // what is the benefit of hooks
  function _addConversation(newConversation: Conversation): Conversation {
    return addConversation(newConversation);
  }

  return _addConversation;

}

export function useChatWithLLM() {

  async function _chatWithLLM(msgContent: string): Promise<Message> {
    const respContent: string = await chatWithLLM(msgContent);
    console.log('response content', respContent)

    const respMessage: Message = {
      id: crypto.randomUUID(),
      content: respContent,
      creator: 'Assistant',
      createdAt: new Date()
    }

    return respMessage;
  }

  return _chatWithLLM;

}