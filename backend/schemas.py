from pydantic import BaseModel

class ReagentBase(BaseModel):
    name: str
    cas_number: str
    smiles: str
    room: str
    storage: str
    shelf: str

class ReagentCreate(ReagentBase):
    pass

# Zamiast:
# class Reagent(BaseModel):
#     id: int
#
#     class Config:
#         orm_mode = True

# Zmień na:
class Reagent(ReagentBase):
    id: int

    class Config:
        orm_mode = True


class StructureSearch(BaseModel):
    query_smiles: str
