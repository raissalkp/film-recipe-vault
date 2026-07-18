from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Recipe
from app.schemas import RecipeCreate, RecipeOut

router = APIRouter(prefix="/recipes", tags=["recipes"])

@router.get("/", response_model=list[RecipeOut])
def get_recipes(tag: str = None, sim: str = None, db: Session = Depends(get_db)):
    query = db.query(Recipe)
    if tag:
        query = query.filter(Recipe.tags.contains(tag))
    if sim:
        query = query.filter(Recipe.film_simulation == sim)
    return query.all()

@router.post("/", response_model=RecipeOut)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = Recipe(**recipe.model_dump())
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@router.get("/search", response_model=list[RecipeOut])
def search_recipes(q: str, db:Session = Depends(get_db)):
    return db.query(Recipe).filter(
        Recipe.name.contains(q) | Recipe.notes.contains(q)
    ).all()

@router.get("/{recipe_id}", response_model=RecipeOut)
def get_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.put("/{recipe_id}", response_model=RecipeOut)
def update_recipe(recipe_id: int, updated: RecipeCreate, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    for key, value in updated.model_dump().items():
        setattr(recipe, key, value)
    db.commit()
    db.refresh(recipe)
    return recipe

@router.delete("/{recipe_id")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(recipe)
    db.commit
    return {"message": "Recipe deleted"}
