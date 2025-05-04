import { Message } from "./message";

export interface Conversation {
  
  id?: string | null;
  title?: string;
  messages?: Message[]; // lazy loading, paging
  lastModifiedAt?: Date;
  
}