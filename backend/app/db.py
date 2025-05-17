from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

HOST = os.environ['POSTGRES_HOST']
PORT = os.environ['POSTGRES_PORT']
USER = os.environ['POSTGRES_USER']
PASSWORD = os.environ['POSTGRES_PASSWORD']
DB_NAME = os.environ['POSTGRES_DB']

POOL_SIZE = int(os.environ['POSTGRES_POOL_SIZE'])
MAX_OVERFLOW = int(os.environ['POSTGRES_MAX_OVERFLOW'])

DB_URL = f'postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}'
engine = create_engine(DB_URL, pool_size=POOL_SIZE, max_overflow=MAX_OVERFLOW, pool_pre_ping=True)

Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # call session.commit() to commit the transaction