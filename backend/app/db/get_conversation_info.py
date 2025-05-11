from motor import AsyncIOMotorClient
from app.models.conversation_model import Conversation
from bson import ObjectId
import asyncio
import os
from typing import List, Optional
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

async def create_conversation_in_db(conversation_data: dict) -> Conversation:
    try:
        #result = await conversation_collection.insert_one(conversation_data)
        #await conversation_collection.find_one({"_id": result.inserted_id})
        result = await conversation_collection.insert_one(conversation_data)
        created_conversation = await conversation_collection.find_one({"_id": result.inserted_id})
        return Conversation(
            id=str(created_conversation["_id"]),
            user_id=created_conversation["user_id"],
            chosen_model=created_conversation["chosen_model"],
            chosen_prompts=created_conversation["chosen_prompts"],
            conversation_title=created_conversation["conversation_title"],
            parameters=created_conversation["parameters"],
            messages=created_conversation["messages"],
        )
    except Exception as e:
        raise RuntimeError(f"Error while creating conversation: {e}")


async def get_conversation_info(user_id: str):
    try:
        if not ObjectId.is_valid(user_id):
            raise ValueError("Invalid user ID format")
        
        conversation = await conversation_collection.find_one({"_id": ObjectId(user_id)})
        if not conversation:
            raise ValueError("Conversation not found")
        
        return Conversation(
            id=str(conversation["_id"]),
            user_id=conversation["user_id"],
            chosen_model=conversation["chosen_model"],
            chosen_prompts=conversation["chosen_prompts"],
            parameters=conversation["parameters"],
            messages=conversation["messages"],
        )
    except Exception as e:
        raise RuntimeError(f"Error while fetching conversation info: {e}")
    
    
    
    
    



#async def list_conversations_from_db(user_id: str):
#    conversations = []
#    async for conversation in conversation_collection.find({"user_id": user_id}):
#        conversations.append(Conversation(
#            id=str(conversation["_id"]),
#            user_id=conversation["user_id"],
#            chosen_model=conversation["chosen_model"],
#            chosen_prompts=conversation["chosen_prompts"],
#            parameters=conversation["parameters"],
#            messages=conversation["messages"],
#        ))
#    return conversations
    
    
    
#if not ObjectId.is_valid(conversation_id):
#    print("Invalid ObjectId format")
#    return
#
#conversation = await conversation_collection.find_one({"_id": ObjectId(conversation_id)})
#if not conversation:
#    print("Conversation not found")
#    return
#
#print("\n Conversation Info:")
#print(f"ID: {conversation['_id']}")
#print(f"User ID: {conversation.get('user_id')}")
#print(f"Chosen Model: {conversation.get('chosen_model')}")
#print(f"Chosen Prompts: {conversation.get('chosen_prompts')}")
#print(f"Parameters: {conversation.get('parameters')}")
#print("Messages:")
#for msg in conversation.get("messages", []):
#    print(f" - [{msg['role']}] {msg['content']}")

#if __name__ == "__main__":
#    conv_id = input("Enter the conversation ID: ").strip()
#    asyncio.run(get_conversation_info(conv_id))
