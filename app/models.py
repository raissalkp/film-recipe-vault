from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone
from app.database import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    film_simulation = Column(String, nullable=False)
    dynamic_range = Column(String, default="DR100")
    highlight_tone = Column(Integer, default=0)
    shadow_tone = Column(Integer, default=0)
    colour = Column(Integer, default=0)
    sharpness = Column(Integer, default=0)
    noise_reduction = Column(Integer, default=0)
    white_balance = Column(String, default="Auto")
    wb_shift_red = Column(Integer, default=0)
    wb_shift_blue = Column(Integer, default=0)
    tags = Column(String, default="")
    notes = Column(String, default="")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    