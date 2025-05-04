import { Conversation } from "../model/conversation"

const conversations: Conversation[] = [
  { id: '1', title: 'How to build AI Agent', messages: [{ id: '1', content: 'This is a message from Assistant', creator: 'Assistant', createdAt: new Date() }, { id: '2', content: 'This is a message from User', creator: 'User', createdAt: new Date() }, { id: '3', content: 'This is a message from Assistant', creator: 'Assistant', createdAt: new Date() }, { id: '5', content: 'This is a message from User', creator: 'User', createdAt: new Date() }, { id: '6', content: 'This is a message from Assistant', creator: 'Assistant', createdAt: new Date() }], lastModifiedAt: new Date() },
  { id: '2', title: 'RAG Application', messages: [{ id: '1', content: 'This is RAG Application Assistatn', creator: 'Assistant', createdAt: new Date() }, { id: '2', content: 'This is a message from User', creator: 'User', createdAt: new Date() }], lastModifiedAt: new Date() },
  { id: '3', title: 'Fullstack Engineering', messages: [{ id: '1', content: 'This is Fullstack Engineering Assistant', creator: 'Assistant', createdAt: new Date() }, { id: '2', content: 'This is a message from User', creator: 'User', createdAt: new Date() }], lastModifiedAt: new Date() }
]

/**
 * List latest conversations order by createdAt DESC
 * @returns 
 */
export function listConversations(): Conversation[] {
  return conversations;
}

export function addConversation(conversation: Conversation): Conversation {
  conversation.id = generateNewConversationId();
  // make backend request to store new conversation
  return conversation;
}

export function generateNewConversationId(): string {
  return crypto.randomUUID();
}

export function generateNewMessageId(): string {
  return crypto.randomUUID();
}