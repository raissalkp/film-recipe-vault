from fastapi import FastAPI
from app.database import Base, engine
from app.routers import recipes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Film Recipe Vault")

app.include_router(recipes.router)
