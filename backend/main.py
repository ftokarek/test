from fastapi import FastAPI
from app.api import prompt_request
from app.api import seller_request

app = FastAPI()

app.include_router(seller_request.router)
app.include_router(prompt_request.router)

@app.get("/")
async def root():
    return {"message": "API is running!"}
