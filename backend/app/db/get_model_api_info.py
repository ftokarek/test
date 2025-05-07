import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import Dict, Any, Optional
from app.models.model_api_info import ModelApiInfo


load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[MONGO_DB_NAME]
except Exception as e:
    raise RuntimeError(f"Failed to connect to MongoDB: {e}")

async def get_model_api_info(model_id: str) -> Optional[Dict[str, Any]]:
    try:
        collection = db["models"]
        
        query = {"_id": ObjectId(model_id)} if ObjectId.is_valid(model_id) else {"_id": model_id}
        
        model_data = await collection.find_one(query)
        if not model_data:
            return None

        return ModelApiInfo(
            id=str(model_data["_id"]),
            name=model_data.get("name", ""),
            api_endpoint=model_data.get("api_endpoint", ""),
            api_key=model_data.get("api_key", ""),
            api_version=model_data.get("api_version", ""),
            parameters=model_data.get("parameters", {}),
            headers=model_data.get("headers", {})
        )

    except Exception as e:
        raise RuntimeError(f"Error while fetching model data: {e}")