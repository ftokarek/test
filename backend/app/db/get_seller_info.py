import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List, Optional
from app.models.seller_model import Seller

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB_NAME]
    sellers_collection = db["sellers"]
except Exception as e:
    raise RuntimeError(f"Failed to connect to MongoDB: {e}")

async def create_seller_in_db(seller_data: dict) -> Seller:
    result = await sellers_collection.insert_one(seller_data)
    created_seller = await sellers_collection.find_one({"_id": result.inserted_id})
    return Seller(
        id=str(created_seller["_id"]),
        name=created_seller["name"],
        description=created_seller["description"],
        products=created_seller["products"],
        opinions=created_seller["opinions"],
        public_key=created_seller["public_key"],
    )

async def list_sellers_from_db() -> List[Seller]:
    sellers = []
    async for seller in sellers_collection.find():
        sellers.append(Seller(
            id=str(seller["_id"]),
            name=seller["name"],
            description=seller["description"],
            products=seller["products"],
            opinions=seller["opinions"],
            public_key=seller["public_key"],
        ))
    return sellers

async def get_seller_from_db(seller_id: str) -> Optional[Seller]:
    seller = await sellers_collection.find_one({"_id": ObjectId(seller_id)})
    if not seller:
        return None
    return Seller(
        id=str(seller["_id"]),
        name=seller["name"],
        description=seller["description"],
        products=seller["products"],
        opinions=seller["opinions"],
        public_key=seller["public_key"],
    )
async def get_seller_public_key(seller_id: str) -> Optional[str]:
    seller = await sellers_collection.find_one({"_id": ObjectId(seller_id)})
    if not seller:
        return None
    return seller["public_key"]