from pydantic import BaseModel, Field
from typing import List, Optional

class PromptBase(BaseModel):
    text: str
    chatbot_name: str
    owner_id: int
    tags: Optional[List[str]] = Field(default_factory=list)
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 150
    top_p: Optional[float] = 1.0
    stop: Optional[List[str]] = None
    model: Optional[str] = None #Uzupełnić później

class PromptCreate(PromptBase):
    pass

class Prompt(PromptBase):
    id: int
