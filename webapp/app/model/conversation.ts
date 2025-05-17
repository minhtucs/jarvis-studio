import { Message } from "./message";

export interface Conversation {
  
  id: string;
  title: string;
  messages?: Message[]; // lazy loading
  createdAt?: Date;
  lastModifiedAt?: Date;
  
} 