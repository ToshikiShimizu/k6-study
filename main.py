from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    user_id: str
    password: str

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/user/")
async def create_item(user: User):
    return user