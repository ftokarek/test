import sys
import os

# adding backend folder to modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from app.services.openai_service import send_to_openai, send_to_gemini, send_to_hugging_face, test_all_apis

def main():
    api_choice = sys.argv[1] if len(sys.argv) > 1 else "all"

    if api_choice == "openai":
        print("\nTesting OpenAI API...\n")
        response = send_to_openai("Introduce yourself in 1 sentence as a language model.")
        print(f"OpenAI Response: {response}\n")
    elif api_choice == "gemini":
        print("\nTesting Gemini API...\n")
        response = send_to_gemini("Introduce yourself in 1 sentence as a language model.")
        print(f"Gemini Response: {response}\n")
    elif api_choice == "huggingface":
        print("\nTesting Hugging Face API...\n")
        response = send_to_hugging_face("Introduce yourself in 1 sentence as a language model.")
        print(f"Hugging Face Response: {response}\n")
    elif api_choice == "all":
        print("\nTesting all APIs...\n")
        test_all_apis()
    else:
        print(f"Invalid API choice: {api_choice}. Please choose 'openai', 'gemini', 'huggingface', or 'all'.")

if __name__ == "__main__":
    main()
