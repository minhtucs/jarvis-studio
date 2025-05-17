import { Message } from "../model/message";
import { Role } from "../model/role";

const API_HOST = 'http://127.0.0.1:8000'

export class MessageService {

  async getLatestMessages(conversationId: string): Promise<Message[]> {
    try {
      const resp = await fetch(`${API_HOST}/api/messages?conversation_id=${conversationId}`);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }

      const data = await resp.json();
      const messages: Message[] = data.map((msg: any) => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        conversationId: msg.conversationId,
        userId: msg.userId,
        createdAt: new Date(msg.createdAt)
      }));
      return messages;
    } catch (error) {
      console.error('Error listConversationMessages', error);
      throw error;
    }
  }

  async saveUserMessage(message: Message): Promise<Message> {
    try {
      const resp = await fetch(`${API_HOST}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }

      const data = await resp.json();
      return data;
    } catch (error) {
      console.error('Error saveMessage', error);
      throw error;
    }
  }
  
  async chatLLM(userMessage: Message): Promise<Message> {
    const request = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userMessage)
    }

    try {
      const resp = await fetch(`${API_HOST}/api/messages/chat`, request);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }
      const data = await resp.json();
      return data.assistant_message;
    } catch (error) {
      console.error('Error chatWithLLM', error);
      throw error;
    }
  }

}