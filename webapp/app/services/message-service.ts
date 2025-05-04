const CHAT_API_ENDPOINT = 'http://127.0.0.1:8000/api/chat'

export async function chatWithLLM(messageContent: string): Promise<string> {
  const messageData = {'content': messageContent}
  const request = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(messageData)
  }
  const response = await fetch(CHAT_API_ENDPOINT, request);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json();
  return data.content;
}