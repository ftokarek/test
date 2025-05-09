# conversation_request.py

from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId

from models import ConversationCreate, Conversation
from app.db.get_conversation_info import conversation_collection  

router = APIRouter()

@router.post("/conversations/", response_model=Conversation)
async def create_conversation(conv_data: ConversationCreate):
    conv_dict = conv_data.dict()
    result = await conversation_collection.insert_one(conv_dict)
    saved = await conversation_collection.find_one({"_id": result.inserted_id})
    return Conversation(**saved)

@router.get("/conversations/{conversation_id}", response_model=Conversation)
async def get_conversation(conversation_id: str):
    if not ObjectId.is_valid(conversation_id):
        raise HTTPException(status_code=400, detail="Invalid conversation ID")

    conversation = await conversation_collection.find_one({"_id": ObjectId(conversation_id)})
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    return Conversation(**conversation)

@router.get("/conversations/user/{user_id}", response_model=List[Conversation])
async def get_user_conversations(user_id: int):
    cursor = conversation_collection.find({"user_id": user_id})
    conversations = [Conversation(**doc) async for doc in cursor]
    return conversations
