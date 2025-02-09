from sqlalchemy.orm import Session
import models, schemas

def create_reagent(db: Session, reagent: schemas.ReagentCreate):
    db_reagent = models.Reagent(**reagent.dict())
    db.add(db_reagent)
    db.commit()
    db.refresh(db_reagent)
    return db_reagent

def search_reagents(db: Session, name: str = None, cas_number: str = None):
    query = db.query(models.Reagent)
    if name:
        query = query.filter(models.Reagent.name.ilike(f"%{name}%"))
    if cas_number:
        query = query.filter(models.Reagent.cas_number == cas_number)
    return query.all()

def search_by_structure(db: Session, query_smiles: str):
    return db.query(models.Reagent).filter(models.Reagent.smiles.contains(query_smiles)).all()
