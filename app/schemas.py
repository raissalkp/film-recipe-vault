from pydantic import BaseModel
from datetime import datetime

class RecipeCreate(BaseModel):
    name: str
    film_simulation: str
    dynamic_range: str = "DR100"
    highlight_tone: int = 0
    shadow_tone: int = 0
    colour: int = 0
    sharpness: int = 0
    noise_reduction: int = 0
    white_balance: str = "Auto"
    wb_shift_red: int = 0
    wb_shift_blue: int = 0
    tags: str = ""
    notes: str = ""

class RecipeOut(RecipeCreate):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}
    