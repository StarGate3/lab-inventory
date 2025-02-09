from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import models, schemas
from fastapi import HTTPException

def create_reagent(db: Session, reagent: schemas.ReagentCreate):
    try:
        db_reagent = models.Reagent(**reagent.dict())
        db.add(db_reagent)
        db.commit()
        db.refresh(db_reagent)
        return db_reagent
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Reagent with this CAS number already exists.")

def search_reagents(db: Session, name: str = None, cas_number: str = None, room: str = None, storage: str = None, shelf: str = None):
    query = db.query(models.Reagent)
    if name:
        query = query.filter(models.Reagent.name.ilike(f"%{name}%"))
    if cas_number:
        query = query.filter(models.Reagent.cas_number.ilike(f"%{cas_number}%"))
    if room:
        query = query.filter(models.Reagent.room.ilike(f"%{room}%"))
    if storage:
        query = query.filter(models.Reagent.storage.ilike(f"%{storage}%"))
    if shelf:
        query = query.filter(models.Reagent.shelf.ilike(f"%{shelf}%"))
    return query.all()

def search_by_structure(db: Session, query_smiles: str):
    return db.query(models.Reagent).filter(models.Reagent.smiles.contains(query_smiles)).all()
