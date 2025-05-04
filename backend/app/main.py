import uvicorn
from fastapi import FastAPI
from app.routers import healthcheck, chats, conversations
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; restrict this in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(healthcheck.router)
app.include_router(chats.router)
app.include_router(conversations.router)


if __name__ == "__main__":
  uvicorn.run(app, host='0.0.0.0', port=8000)