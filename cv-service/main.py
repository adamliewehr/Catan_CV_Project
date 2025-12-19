from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class DiceImage(BaseModel):
    image: str  # This matches the key we'll send from Express
    # if the data coming in isn't a string, we block the request

@app.post("/process-dice")
async def process_dice(data: DiceImage):
    # Print the first 50 characters to the terminal so we can see the 'header'
    print(f"Received data: {data.image[:50]}...") 
    
    return {
        "status": "success",
        "received_length": len(data.image),
        "preview": data.image[:20]
    }