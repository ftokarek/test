from pydantic import BaseModel, Field
from typing import List, Optional

class PromptBase(BaseModel):
    ##podstawa##
    text: str
    owner_id: int
    chatbot_model: str
    ###########
    tags: Optional[List[str]] = Field(default_factory=list) #Kategoryzacja
    temperature: Optional[float] = 0.7 #Do randomizacji (raczej useless)
    max_tokens: Optional[int] = 150 #Tokeny
    #top_p: Optional[float] = 1.0 #KOlejne randomizacje (też raczej useless)
    stop: Optional[List[str]] = None #LIsta słów zatrzymujących generację

class PromptCreate(PromptBase):
    pass

class Prompt(PromptBase):
    id: int
