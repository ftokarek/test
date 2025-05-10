from fastapi import FastAPI, HTTPException
from prompt_model import Prompt, PromptCreate
from typing import List

app = FastAPI()

# Bieda baza danych w pamięci
prompts_db: List[Prompt] = []
next_prompt_id = 1
#############################

@app.post("/prompts/", response_model=Prompt)
def create_prompt(prompt_data: PromptCreate):
    global next_prompt_id
    prompt = Prompt(id=next_prompt_id, **prompt_data.dict())
    prompts_db.append(prompt)
    next_prompt_id += 1
    return prompt

@app.get("/prompts/", response_model=List[Prompt])
def list_prompts():
    return prompts_db

@app.get("/prompts/{prompt_id}", response_model=Prompt)
def get_prompt(prompt_id: int):
    for prompt in prompts_db:
        if prompt.id == prompt_id:
            return prompt
    raise HTTPException(status_code=404, detail="Prompt not found")
