import { Conversation } from "../model/conversation"
import { Role } from "../model/role";

const conversations: Conversation[] = [
  { id: '1', title: 'How to build AI Agent', messages: [{ id: '1', content: 'This is a message from Assistant', role: Role.Assistant, createdAt: new Date() }, { id: '2', content: 'This is a message from User', role: Role.User, createdAt: new Date() }, { id: '3', content: 'This is a message from Assistant', role: Role.Assistant, createdAt: new Date() }, { id: '5', content: 'This is a message from User', role: Role.User, createdAt: new Date() }, { id: '6', content: 'This is a message from Assistant', role: Role.Assistant, createdAt: new Date() }], lastModifiedAt: new Date() },
  { id: '2', title: 'RAG Application', messages: [{ id: '1', content: 'This is RAG Application Assistatn', role: Role.Assistant, createdAt: new Date() }, { id: '2', content: 'This is a message from User', role: Role.User, createdAt: new Date() }], lastModifiedAt: new Date() },
  { id: '3', title: 'Fullstack Engineering', messages: [{ id: '1', content: 'This is Fullstack Engineering Assistant', role: Role.Assistant, createdAt: new Date() }, { id: '2', content: 'This is a message from User', role: Role.User, createdAt: new Date() }], lastModifiedAt: new Date() }
]

export class ConversationService {

  listConversations(): Conversation[] {
    return conversations;
  }

  addConversation(): Conversation {
    const conversation: Conversation = {
      id: this.generateConversationId(),
      title: 'New Conversation',
      messages: [],
      lastModifiedAt: new Date()
    }
    return conversation
  }

  generateConversationId(): string {
    return crypto.randomUUID();
  }

  generateMessageId(): string {
    return crypto.randomUUID();
  }

}