from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

from app.database import Base, engine
from app.routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sunset Auth API", version="1.0.0")
app.include_router(auth.router, prefix="/api")


@app.get("/health", response_class=PlainTextResponse)
def health() -> str:
    return "ok"
