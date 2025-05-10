from fastapi import FastAPI
from app.api import prompt_request
from app.api import seller_request
from app.api import conversation_request
from app.services import prompts_for_sale_endpoint_forwarder

app = FastAPI()

app.include_router(seller_request.router)
app.include_router(prompt_request.router)
app.include_router(conversation_request.router)
app.include_router(prompts_for_sale_endpoint_forwarder.router)

@app.get("/")
async def root():
    return {"message": "API is running!"}
