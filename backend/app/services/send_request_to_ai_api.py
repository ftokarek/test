import aiohttp
from typing import Dict, List, Any
from aiohttp import ClientError

from app.services.openai_service import build_payload, parse_response

from app.services.user_conversation_message_adder import add_message_to_conversation


async def send_request_to_ai_api(
    prompts_data: List[Dict[str, Any]],
    model_info: Dict[str, Any],
    user_message: str
) -> Dict[str, Any]:
    try:
        full_prompt = "\n\n".join([prompt["text"] for prompt in prompts_data]) + f"\n\n{user_message}"
        
        api_endpoint = model_info["api_endpoint"]
        api_key = model_info["api_key"]
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            **model_info.get("headers", {})
        }
        
        payload = build_payload(api_endpoint, model_info, full_prompt)

        # add user_message to conversation history
        
        ######## add user msg

        async with aiohttp.ClientSession() as session:
            async with session.post(api_endpoint, headers=headers, json=payload) as response:
                if response.status != 200:
                    error_text = await response.text()
                    #####tu był adder#####
                    raise Exception(f"API returned status code {response.status}: {error_text}")
                
                response_data = await response.json()
                return parse_response(api_endpoint, response_data)
    
    except ClientError as e:
        raise Exception(f"HTTP request failed: {str(e)}")
    except Exception as e:
        #user_id = "user_id"  # Replace with actual user ID when possi'bl
        add_message_to_conversation("user_id", "Unexpected error", "user")
        raise Exception(f"Unexpected error: {str(e)}")
    

