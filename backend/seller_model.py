from pydantic import BaseModel
from typing import List, Optional
from product_model import Product

class Opinion_S(BaseModel):
    id: int
    rating: int 
    content: Optional[str] = None

class SellerBase(BaseModel):
    name: str
    description: Optional[str] = None

class SellerCreate(SellerBase):
    products: List[Product] = []
    opinions: List[Opinion_S] = []

class Seller(SellerBase):
    id: int
    products: List[Product] = []
    opinions: List[Opinion_S] = []