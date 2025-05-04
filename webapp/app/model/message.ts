export interface Message {
  
  id: string;
  content: string;
  role: 'User' | 'Assistant';
  createdAt: Date;
  // type: TEXT, IMAGE

}
