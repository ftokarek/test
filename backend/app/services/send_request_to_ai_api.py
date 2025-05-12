from typing import Dict, List, Any

from app.services.openai_service import build_payload, parse_response

from app.services.user_conversation_message_adder import add_message_to_conversation


from app.services.openai_service import send_to_openai, send_to_gemini, send_to_hugging_face


async def send_request_to_ai_api(
    prompts_data: List[Dict[str, Any]],
    model_info: str,
    user_message: str,
    user_id: str,
    conversation_id: str,
) -> Dict[str, Any]:
    try:

        full_prompt = "\n\n".join([prompt["text"] for prompt in prompts_data]) + f"\n\n{user_message}"

        # Wybierz odpowiednie API na podstawie api_choice
        if model_info == "openai":
            #response = send_to_openai(full_prompt)
            response = send_to_gemini(full_prompt)
        elif model_info == "gemini":
            response = send_to_gemini(full_prompt)
        elif model_info == "huggingface":
            #response = send_to_hugging_face(full_prompt)
            response = send_to_gemini(full_prompt)
        else:
            raise ValueError(f"Invalid API choice: {model_info}. Please choose 'openai', 'gemini', or 'huggingface'.")

        # Zwróć odpowiedź
        return {
            "response": response,
        }

    except Exception as e:
        raise Exception(f"Error while processing request with {model_info}: {str(e)}")