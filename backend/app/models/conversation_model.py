from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from bson import ObjectId

#class PyObjectId(ObjectId):
#    @classmethod
#    def __get_validators__(cls):
#        yield cls.validate
#    @classmethod
#    def validate(cls, v):
#        if not ObjectId.is_valid(v):
#            raise ValueError("Invalid ObjectId")
#        return ObjectId(v)

class Message(BaseModel):
    role: str  #user, asyst, system
    content: str
    timestamp: Optional[str] = None  

class ConversationBase(BaseModel):
    user_id: int
    chosen_model: Optional[str] = None #"gpt-3.5"
    chosen_prompts: Optional[List[str]] = []  
    messages: List[Message] = []
    parameters: Optional[Dict[str, Any]] = {}  

class ConversationCreate(ConversationBase):
    pass

class Conversation(ConversationBase):
 #   id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        #schema_extra = {
        #    "example": {
        #        "user_id": 1,
        #        "chosen_model": "gpt-3.5",
        #        "chosen_prompts": ["prompt1", "prompt2"],
        #        "messages": [
        #            {"role": "user", "content": "Hello!"},
        #            {"role": "assistant", "content": "Hi there!"}
        #        ],
        #        "parameters": {
        #            "temperature": 0.7,
        #            "max_tokens": 150
        #        }
        #    }
        #}