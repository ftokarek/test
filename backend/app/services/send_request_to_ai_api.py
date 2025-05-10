import aiohttp
from typing import Dict, List, Any
from aiohttp import ClientError

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
        
        async with aiohttp.ClientSession() as session:
            async with session.post(api_endpoint, headers=headers, json=payload) as response:
                if response.status != 200:
                    error_text = await response.text()
                    raise Exception(f"API returned status code {response.status}: {error_text}")
                
                response_data = await response.json()
                return parse_response(api_endpoint, response_data)
    
    except ClientError as e:
        raise Exception(f"HTTP request failed: {str(e)}")
    except Exception as e:
        raise Exception(f"Unexpected error: {str(e)}")


## Zostawić aż podłączy się API

## to rebuild, to discuss with the team
def build_payload(api_endpoint: str, model_info: Dict[str, Any], full_prompt: str) -> Dict[str, Any]:

    if "openai" in api_endpoint.lower():
        return {
            "model": model_info.get("name", "gpt-4"),
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": full_prompt}
            ],
            **model_info.get("parameters", {})
        }
    else:
        return {
            "prompt": full_prompt,
            "model": model_info.get("name", ""),
            **model_info.get("parameters", {})
        }
    # to upbuild

## same as above
def parse_response(api_endpoint: str, response_data: Dict[str, Any]) -> Dict[str, Any]:

    if "openai" in api_endpoint.lower():
        return {
            "text": response_data.get("choices", [{}])[0].get("message", {}).get("content", ""),
            "raw_response": response_data
        }
    else:
        return {
            "text": response_data.get("output", response_data.get("text", response_data.get("response", ""))),
            "raw_response": response_data
        }
    # to upbuild