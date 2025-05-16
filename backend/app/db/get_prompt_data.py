import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import Dict, Any, Optional
from app.models.prompt_model import PromptModel

load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB_NAME]
except Exception as e:
    raise RuntimeError(f"Failed to connect to MongoDB: {e}")

async def get_prompt_data(prompt_id: str) -> Optional[Dict[str, Any]]:
    try:
        print("Connected to MongoDB")
        collection = db["products"]
        
        query = {"_id": ObjectId(prompt_id)} if ObjectId.is_valid(prompt_id) else {"_id": prompt_id}
        
        prompt_data = await collection.find_one(query)
        if not prompt_data:
            return None
        print(prompt_data)

        return PromptModel(
            id=str(prompt_data["_id"]),
            text=str(prompt_data["promptText"]),
        )

    except Exception as e:
        raise RuntimeError(f"Error while fetching prompt data: {e}")