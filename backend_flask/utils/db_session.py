from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# ✅ Use your actual DB path or URI here (e.g., PostgreSQL if needed)
SQLALCHEMY_DATABASE_URL = "sqlite:///./pricing.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}  # Only for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

print("db_session.py ran successfully")