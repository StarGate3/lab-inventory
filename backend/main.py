from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas
import crud
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Konfiguracja CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # W produkcji ogranicz do konkretnych domen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/add_reagent/", response_model=schemas.Reagent)
def add_reagent(reagent: schemas.ReagentCreate, db: Session = Depends(get_db)):
    return crud.create_reagent(db=db, reagent=reagent)

@app.get("/search/")
def search_reagents(name: str = None, cas_number: str = None, smiles: str = None, room: str = None, storage: str = None, shelf: str = None, db: Session = Depends(get_db)):
    return crud.search_reagents(db=db, name=name, cas_number=cas_number, smiles=smiles, room=room, storage=storage, shelf=shelf)

@app.post("/search_by_structure/")
def search_by_structure(query_smiles: schemas.StructureSearch, db: Session = Depends(get_db)):
    return crud.search_by_structure(db=db, query_smiles=query_smiles.query_smiles)

@app.get("/structure/{smiles}")
def get_structure(smiles: str):
    return {"image_url": f"https://cactus.nci.nih.gov/chemical/structure/{smiles}/image"}
