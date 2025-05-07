from pydantic import BaseModel
from typing import Optional, Dict

class PromptModel(BaseModel):
    id: str
    text: str
    metadata: Optional[Dict[str, str]] = None