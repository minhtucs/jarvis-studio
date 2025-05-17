from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

llm = OpenAI()
model = 'gpt-4o-mini-2024-07-18'

class LLMService:
  """Service responsible for interacting with the LLM providers.
     - Manage the LLM providers
     - Send messages to the LLM providers
     - Handle the responses from the LLM providers
     - Handle the errors, ratelimits, timeouts, retries, caching, logging... from the LLM providers
  """
  def send_message(self, content: str) -> str:
    response = llm.chat.completions.create(
      model=model,
      messages=[
        {
          'role': 'user',
          'content': content
        }
      ]
    )

    # handle error

    return response.choices[0].message.content