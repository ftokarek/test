from fastapi import FastAPI
from app.api import prompt_request
from app.api import seller_request
from app.api import conversation_request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
#from app.api import transaction_validation

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Lista dozwolonych origins (frontend URL)
    allow_credentials=True,
    allow_methods=["*"],  # Dozwolone metody HTTP
    allow_headers=["*"],  # Dozwolone nagłówki
)

app.include_router(seller_request.router)
app.include_router(prompt_request.router)
app.include_router(conversation_request.router)
#app.include_router(transaction_validation.router)

@app.get("/socket.io/")
async def socket_io_dummy():
    return JSONResponse(content={"message": "Socket.IO endpoint placeholder"})

@app.get("/")
async def root():
    return {"message": "API is running!"}
