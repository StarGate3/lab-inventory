from sqlalchemy import Column, Integer, String
from database import Base

class Reagent(Base):
    __tablename__ = "reagents"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    cas_number = Column(String, unique=True, index=True)
    smiles = Column(String)
    room = Column(String)
    storage = Column(String)
    shelf = Column(String)
