from psycopg_pool import ConnectionPool
from dotenv import load_dotenv
import os

load_dotenv()

db_config = (
  f"host={os.environ['POSTGRESQL_HOST']} "
  f"port={os.environ['POSTGRESQL_PORT']} "
  f"user={os.environ['POSTGRESQL_USER']} "
  f"password={os.environ['POSTGRESQL_PASSWORD']} "
  f"dbname={os.environ['POSTGRESQL_DB']}"
)

MIN_CONN = int(os.environ['POSTGRESQL_MIN_CONN'])
MAX_CONN = int(os.environ['POSTGRESQL_MAX_CONN'])

pool = ConnectionPool(conninfo=db_config, min_size=MIN_CONN, max_size=MAX_CONN)

def get_pool() -> ConnectionPool:
  return pool