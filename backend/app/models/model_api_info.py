from pydantic import BaseModel
from typing import Optional, Dict

class ModelApiInfo(BaseModel):
    id: str
    name: str
    api_endpoint: str
    api_key: Optional[str] = None
    api_version: Optional[str] = None
    parameters: Optional[Dict[str, str]] = None
    headers: Optional[Dict[str, str]] = None