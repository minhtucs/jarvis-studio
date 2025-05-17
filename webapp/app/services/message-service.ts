import { Message } from "../model/message";
import { Role } from "../model/role";

const CHAT_API_ENDPOINT = 'http://127.0.0.1:8000/api/chat'

export class MessageService {
  
  async sendMessage(messageContent: string): Promise<Message> {
    const messageData = {'content': messageContent}
    const request = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageData)
    }

    try {
      const resp = await fetch(CHAT_API_ENDPOINT, request);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }
      const data = await resp.json();

      const message: Message = {
          id: crypto.randomUUID(),
          content: data.content,
          role: Role.Assistant,
          createdAt: new Date()
      }
      return message;
    } catch (error) {
      console.error('Error chatWithLLM', error);
      throw error;
    }
  }

}

// export async function chatWithLLM(messageContent: string): Promise<Message> {
//   const messageData = {'content': messageContent}
//   const request = {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(messageData)
//   }

//   try {
//     const resp = await fetch(CHAT_API_ENDPOINT, request);
//     if (!resp.ok) {
//       throw new Error(`HTTP error! status: ${resp.status}`)
//     }
//     const data = await resp.json();

//     const message: Message = {
//         id: crypto.randomUUID(),
//         content: data.content,
//         role: Role.Assistant,
//         createdAt: new Date()
//     }
//     return message;
//   } catch (error) {
//     console.error('Error chatWithLLM', error);
//     throw error;
//   }
// }