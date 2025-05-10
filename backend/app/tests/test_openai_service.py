import sys
import os

# Dodaj folder backend do ścieżki modułów
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from app.services.openai_service import test_openai_connection

def main():
    result = test_openai_connection()
    print("LLM API Connection Result:", result)

if __name__ == "__main__":
    main()
