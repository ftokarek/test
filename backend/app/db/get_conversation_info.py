from motor import AsyncIOMotorClient
from bson import ObjectId
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()  

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB_NAME", "ai_models_db")
COLLECTION_NAME = "conversations"

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    conversation_collection = db[COLLECTION_NAME]
except Exception as e:
    raise RuntimeError(f"Failed to connect to MongoDB: {e}")

async def create_conversation_in_db(conversation_data: dict):
    result = await conversation_collection.insert_one(conversation_data)
    created_conversation = await conversation_collection.find_one({"_id": result.inserted_id})
    return created_conversation

async def get_conversation_info(conversation_id: str):
    if not ObjectId.is_valid(conversation_id):
        print("Invalid ObjectId format")
        return

    conversation = await conversation_collection.find_one({"_id": ObjectId(conversation_id)})
    if not conversation:
        print("Conversation not found")
        return

    print("\n Conversation Info:")
    print(f"ID: {conversation['_id']}")
    print(f"User ID: {conversation.get('user_id')}")
    print(f"Chosen Model: {conversation.get('chosen_model')}")
    print(f"Chosen Prompts: {conversation.get('chosen_prompts')}")
    print(f"Parameters: {conversation.get('parameters')}")
    print("Messages:")
    for msg in conversation.get("messages", []):
        print(f" - [{msg['role']}] {msg['content']}")

#if __name__ == "__main__":
#    conv_id = input("Enter the conversation ID: ").strip()
#    asyncio.run(get_conversation_info(conv_id))
