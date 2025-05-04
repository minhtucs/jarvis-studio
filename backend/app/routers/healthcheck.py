from fastapi import APIRouter
from datetime import datetime
from typing import Union

router = APIRouter()

@router.get('/hello/{name}')
def hello(name: str, query: Union[str, None] = None):
  return { 'your_name': name, 'your_message': query, 'current_time': datetime.now() }