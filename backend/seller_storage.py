from fastapi import FastAPI, HTTPException
from seller_model import Seller, SellerCreate
from typing import List

app = FastAPI()

#### dziado-symulacja bazy danych ####
sellers_db: List[Seller] = []
next_seller_id = 1
### do wywalenia po dodaniu mongoDB ###

@app.post("/sellers/", response_model=Seller)
def create_seller(seller_data: SellerCreate):
    global next_seller_id
    seller = Seller(
        id=next_seller_id,
        name=seller_data.name,
        description=seller_data.description,
        products=seller_data.products,
        opinions=seller_data.opinions,
    )
    sellers_db.append(seller)
    next_seller_id += 1
    return seller

@app.get("/sellers/", response_model=List[Seller])
def list_sellers():
    return sellers_db

@app.get("/sellers/{seller_id}", response_model=Seller)
def get_seller(seller_id: int):
    for seller in sellers_db:
        if seller.id == seller_id:
            return seller
    raise HTTPException(status_code=404, detail="Seller not found")
