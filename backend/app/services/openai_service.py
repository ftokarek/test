import os
import openai
from dotenv import load_dotenv
from google import genai  

# Load environment variables
load_dotenv()

# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

# Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Debugging: Print confirmation of loaded API keys
print("\nLoaded OpenAI API Key\n")
print("Loaded Gemini API Key\n")

def build_payload(prompt: str, model: str = "gpt-3.5-turbo", max_tokens: int = 1000):
    """
    Build the payload for the OpenAI API request.
    """
    return {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": max_tokens,
        "temperature": 0.7
    }

def parse_response(response):
    """
    Parse the response from the OpenAI API.
    """
    try:
        return response["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError) as e:
        raise ValueError(f"Failed to parse OpenAI response: {e}")

#sent to gemini - use only when openai fails
def send_to_gemini(prompt: str):
    """
    Send the prompt to Gemini API using Google GenAI as a fallback.
    """
    try:
        # Initialize the GenAI client
        client = genai.Client(api_key=GEMINI_API_KEY)
        
        # Generate content using the Gemini model
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        
        #return response..
        return response.text.strip()
    except Exception as e:
        return f"Failed to connect to Gemini API: {e}"

def test_openai_connection():
    """
    Test the connection to OpenAI API by sending a simple request.
    If OpenAI fails, fallback to Gemini API.
    """
    prompt = "introduce yourself in 1 sentence as google gemini"
    try:
        payload = build_payload(prompt)
        response = openai.ChatCompletion.create(**payload)
        return parse_response(response)
    except Exception as e:
        print(f"\nOpenAI API failed: {e}\n")
        print("Falling back to Gemini API...\n")
        return send_to_gemini(prompt)
