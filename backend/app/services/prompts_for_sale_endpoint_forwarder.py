from fastapi import APIRouter, HTTPException
from bson import ObjectId
from typing import List
from app.db import get_prompt_data 
from app.models import prompt_model as pmodel

router = APIRouter()
prompt_collection = get_prompt_data["prompts"]

@router.get("/prompts/forward", response_model=List[pmodel.Prompt_Model])
async def forward_all_prompts():
    try:
        cursor = prompt_collection.find({})
        prompts = [pmodel.Prompt_Model(**doc) async for doc in cursor]
        return prompts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
