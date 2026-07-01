from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import Optional

class PatientCreate(BaseModel):
    full_name: str
    phone: str
    email: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    allergies: Optional[str] = None
    blood_type: Optional[str] = None

class PatientResponse(PatientCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True