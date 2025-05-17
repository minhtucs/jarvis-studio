from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

llm = OpenAI()
model = 'gpt-4o-mini-2024-07-18'

class MessageRequest(BaseModel):
  content: str

class LLMService:
  def send_message(self, request: MessageRequest):
    response = llm.chat.completions.create(
      model=model,
      messages=[
        {
          'role': 'user',
          'content': request.content
        }
      ]
    )

    # handle error

    return {'content': response.choices[0].message.content}