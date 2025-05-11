import os
from dotenv import load_dotenv
from app.models.conversation_model import Conversation, Message
from app.db.get_conversation_info import get_conversation_info
from typing import List
from bson import ObjectId

def add_message_to_conversation(conversation_id: str, message: str, rol: str) -> Conversation:
    #"""
    #Adds a message to the conversation with the given ID.
    #"""
    try:
        if not ObjectId.is_valid(conversation_id):
            raise ValueError("Invalid conversation ID format")
        
        # Fetch
        conversation = get_conversation_info(conversation_id)
        if not conversation:
            raise ValueError("Conversation not found")
        
        # Add new message
        M = Message(rol,message)
        conversation.messages.append(M)
        
        return conversation
    except Exception as e:
        raise RuntimeError(f"Error while adding message to conversation: {e}")
