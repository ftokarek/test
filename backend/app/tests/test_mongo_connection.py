from pymongo import MongoClient
from dotenv import load_dotenv
import os

##vars
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

def test_connection():
    try:
        collections = db.list_collection_names()
        print("Connected to MongoDB. Collections:", collections)
    except Exception as e:
        print("Failed to connect to MongoDB:", e)

if __name__ == "__main__":
    test_connection()
