from pydantic import BaseModel
from typing import List, Optional

class Opinion_P(BaseModel):
    id: int
    rating: int 
    content: Optional[str] = None

class Product(BaseModel):
    id: int
    title: str
    price: float
    description: Optional[str] = None
    opinion: Optional[Opinion_P] = None

class SellerBase(BaseModel):
    name: str
    description: Optional[str] = None

