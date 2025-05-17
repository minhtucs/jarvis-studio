import { create } from "domain";
import { Conversation } from "../model/conversation"

const API_HOST = 'http://127.0.0.1:8000'

export class ConversationService {

  async getConversations(): Promise<Conversation[]> {
    try {
      const resp = await fetch(`${API_HOST}/api/conversations`);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }

      const data = await resp.json();
      const conversations: Conversation[] = data.map((conv: any) => ({
        id: conv.id,
        title: conv.title,
        messages: [],
        createdAt: new Date(conv.createdAt),
        lastModifiedAt: new Date(conv.lastModifiedAt)
      }));
      return conversations;
    } catch (error) {
      console.error('Error listConversations', error);
      throw error;
    }
  }

  async saveConversation(conversation: Conversation): Promise<Conversation> {
    try {
      const resp = await fetch(`${API_HOST}/api/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(conversation)
      });
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }

      const data = await resp.json();
      return data;
    } catch (error) {
      console.error('Error saveConversation', error);
      throw error;
    }
  }

  newDraftConversation(): Conversation {
    const conversation: Conversation = {
      id: this.generateConversationId(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      lastModifiedAt: new Date()
    };
    return conversation
  }

  generateConversationId(): string {
    return crypto.randomUUID();
  }

  generateTitleFromMessage(messageContent: string): string {
    const maxLength = 25;
    const title = messageContent.length > maxLength ? messageContent.substring(0, maxLength) + '...' : messageContent;
    return title;
  }

}