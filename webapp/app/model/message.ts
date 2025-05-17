import { Role } from "./role";

export interface Message {
  
  id?: number;
  content: string;
  role: Role;
  conversationId: string;
  userId?: number;
  createdAt?: Date;
  // status: string; // PENDING, SUCCESS, ERROR

}
