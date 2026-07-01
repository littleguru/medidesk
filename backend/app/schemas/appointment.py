from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.appointment import AppointmentStatus

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_name: str
    appointment_date: datetime
    reason: Optional[str] = None
    notes: Optional[str] = None

class AppointmentUpdate(BaseModel):
    status: Optional[AppointmentStatus] = None
    notes: Optional[str] = None
    doctor_name: Optional[str] = None
    appointment_date: Optional[datetime] = None

class AppointmentResponse(BaseModel):
    id: int
    patient_id: int
    doctor_name: str
    appointment_date: datetime
    reason: Optional[str] = None
    status: AppointmentStatus
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True