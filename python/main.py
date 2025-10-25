from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any
import time

app = FastAPI()

@app.get("/api/ping")
def ping():
    return {"pong": True, "time": int(time.time()*1000)}

@app.get("/api/items")
def items():
    return [{"id":1,"name":"apple"},{"id":2,"name":"banana"}]

class Payload(BaseModel):
    __root__: Any

@app.post("/api/echo")
def echo(payload: Payload):
    return {"received": payload.__root__, "serverTs": int(time.time()*1000)}
