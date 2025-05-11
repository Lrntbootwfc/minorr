from db_session import Base, engine
from models import Product

# Create all tables in the database
Base.metadata.create_all(bind=engine)

print("✅ Database initialized successfully.")
