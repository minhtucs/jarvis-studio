from psycopg_pool import ConnectionPool
from dotenv import load_dotenv
import os

load_dotenv()

db_config = (
  f"host={os.environ['POSTGRES_HOST']} "
  f"port={os.environ['POSTGRES_PORT']} "
  f"user={os.environ['POSTGRES_USER']} "
  f"password={os.environ['POSTGRES_PASSWORD']} "
  f"dbname={os.environ['POSTGRES_DB']}"
)

MIN_CONN = int(os.environ['POSTGRES_MIN_CONN'])
MAX_CONN = int(os.environ['POSTGRES_MAX_CONN'])

pool = ConnectionPool(conninfo=db_config, min_size=MIN_CONN, max_size=MAX_CONN)

def get_pool() -> ConnectionPool:
  return pool