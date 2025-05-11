from sqlalchemy import Column, Integer, String, Float, DateTime
from .db_session import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, nullable=False)
    category = Column(String)
    mrp = Column(Float)
    selling_price = Column(Float)
    rating = Column(Float)
    rating_count = Column(Integer)
    timestamp = Column(DateTime)
    inventory = Column(Integer)
    demand = Column(Integer)
    base_price = Column(Float)
    competitor_price = Column(Float)
    final_price = Column(Float)
    
print("models.py ran successfully")