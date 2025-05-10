import openai
from dotenv import load_dotenv
import os

load_dotenv()

# OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def test_connection():
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Hello, OpenAI!"}],
            max_tokens=10
        )
        print("Connection successful:", response["choices"][0]["message"]["content"])
    except Exception as e:
        print("Failed to connect to OpenAI API:", e)

if __name__ == "__main__":
    test_connection()
