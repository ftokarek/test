from fastapi import HTTPException
from app.db.get_prompt_data import get_prompt_data
from app.db.get_model_api_info import get_model_api_info
from app.services.send_request_to_ai_api import send_request_to_ai_api

async def process_prompt_request(prompt_ids: list, model_id: str, user_message: str, user_id: str, conversation_id: str):
    prompts_data = []
    for prompt_id in prompt_ids:
        prompt_data = await get_prompt_data(prompt_id)
        if not prompt_data:
            raise HTTPException(status_code=404, detail=f"Prompt ID {prompt_id} not found!")
        prompts_data.append(prompt_data)
    
    model_info = await get_model_api_info(model_id)
    if not model_info:
        raise HTTPException(status_code=404, detail=f"Model ID {model_id} not found!")
    
    response = await send_request_to_ai_api(
        prompts_data = prompts_data,
        model_info = model_info,
        user_message = user_message,
        user_id = user_id,
        conversation_id = conversation_id
    )
    return response