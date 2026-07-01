from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from app.database import Base, engine
from app.routes import patients, appointments, auth
from app.models import patient, appointment, user

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediDesk API",
    version="1.0.0",
    swagger_ui_init_oauth={},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(appointments.router)

@app.get("/")
def root():
    return {"message": "MediDesk API is running 🚀"}
