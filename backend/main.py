from fastapi import FastAPI
from app.api import prompt_request
from app.api import seller_request
from app.api import conversation_request
#from app.api import transaction_validation

app = FastAPI()

app.include_router(seller_request.router)
app.include_router(prompt_request.router)
app.include_router(conversation_request.router)
#app.include_router(transaction_validation.router)

@app.get("/")
async def root():
    return {"message": "API is running!"}
