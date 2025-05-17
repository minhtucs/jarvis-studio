import { Role } from "./role";

export interface Message {
  
  id: string;
  content: string;
  role: Role;
  createdAt: Date;
  // type: TEXT, IMAGE

}
