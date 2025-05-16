from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId
from app.models.conversation_model import Conversation, ConversationCreate, Message
from app.db.get_conversation_info import create_conversation_in_db, get_conversation_info
from app.services.openai_service import parse_response

router = APIRouter()

@router.post("/conversations/", response_model=Conversation)
async def create_conversation(conv_data: dict):
    try:
        print(conv_data)
        conv_dict = {
            "user_id": conv_data['user_id'],
            "chosen_model": conv_data['chosen_model'],
            "chosen_prompts": conv_data['chosen_prompts'],
            "parameters": {},
            "messages": [],
            "conversation_title": "Default"
        }
        conv_final = await create_conversation_in_db(conv_dict)
        return conv_final
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")



@router.get("/conversations/{user_id}", response_model=[])
async def get_conversation(user_id: str):
    print("User ID:", user_id)
    got_conversations = await get_conversation_info(user_id)
    if not got_conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")
    for conversation in got_conversations:
        conversation["_id"] = str(conversation["_id"])
    print("Got conversations:", got_conversations)
    return got_conversations
    



#return await get_conversation_info(conversation_id) ## do wyje 
# if not ObjectId.is_valid(conversation_id):
#    raise HTTPException(status_code=400, detail="Invalid conversation ID")





#from fastapi import APIRouter, HTTPException
#from typing import List
#from bson import ObjectId
#
#from app.models.conversation_model import ConversationCreate, Conversation, ConversationBase
#from app.db.get_conversation_info import conversation_collection  
#
#router = APIRouter()
#
#@router.post("/conversations/", response_model=ConversationBase)
#async def create_conversation(conv_data: ConversationCreate):
#    conv_dict = conv_data#.dict()
#    result = await conversation_collection.insert_one(conv_dict)
#    saved = await conversation_collection.find_one({"_id": result.inserted_id})
#    return Conversation(**saved)
#
#@router.get("/conversations/{conversation_id}", response_model=Conversation)
#async def get_conversation(conversation_id: str):
#    if not ObjectId.is_valid(conversation_id):
#        raise HTTPException(status_code=400, detail="Invalid conversation ID")
#
#    conversation = await conversation_collection.find_one({"_id": ObjectId(conversation_id)})
#    if not conversation:
#        raise HTTPException(status_code=404, detail="Conversation not found")
#
#    return Conversation(**conversation)
#
#@router.get("/conversations/user/{user_id}", response_model=List[Conversation])
#async def get_user_conversations(user_id: int):
#    cursor = conversation_collection.find({"user_id": user_id})
#    conversations = [Conversation(**doc) async for doc in cursor]
#    return conversations



