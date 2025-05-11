import os
from dotenv import load_dotenv
from app.models.conversation_model import Conversation, Message
from app.db.get_conversation_info import get_conversation_info, update_conversation_in_db, update_message_to_conversation
from typing import List
from bson import ObjectId

def add_message_to_conversation(conversation_id: str, message: str, rol: str):
    #Adds a message to the conversation with the given ID.
    try:
        update_message_to_conversation(conversation_id, message, rol)
    except Exception as e:
        raise RuntimeError(f"Error while adding message to conversation: {e}")


#def add_message_to_conversation(conversation_id: str, message: str, rol: str):#->Conversation
#    #"""
#    #Adds a message to the conversation with the given ID.
#    #"""
#    try:
#        # Fetch
#        #conversation = get_conversation_info(conversation_id)
#        #if not conversation:
#        #    raise ValueError("Conversation not found")
#        
#        # Add new message
#        M = Message(rol,message)
#        #conversation.messages.append(M)
#        
#        update_conversation_in_db(conversation_id, {"messages": conversation.messages})
#        #return conversation
#    except Exception as e:
#        raise RuntimeError(f"Error while adding message to conversation: {e}")
