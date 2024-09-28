from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sentence_transformers import SentenceTransformer
from database import SessionLocal, engine, Base
from models import Document
import utils

app = FastAPI()

# Allow CORS for your frontend application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Initialize the pre-trained model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Database initialization
Base.metadata.create_all(bind=engine)

# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API to upload a document
@app.post("/upload/")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()
    text = utils.extract_text(file.filename, content)
    
    if not text:
        raise HTTPException(status_code=400, detail="Document text extraction failed")
    
    # Create embedding
    embedding = model.encode([text])[0]
    
    # Store document in the database
    doc = Document(name=file.filename, content=text, embedding=embedding.tolist())
    db.add(doc)
    db.commit()
    
    return {"message": f"Document {file.filename} uploaded successfully."}

# API for semantic search
class SearchQuery(BaseModel):
    query: str

@app.post("/search/")
async def search_document(query: SearchQuery, db: Session = Depends(get_db)):
    query_embedding = model.encode([query.query])[0]
    
    # Fetch all documents from the DB
    documents = db.query(Document).all()
    
    # Compute similarity scores
    similarities = [
        (doc.name, utils.cosine_similarity(query_embedding, doc.embedding))
        for doc in documents
    ]
    
    # Sort by similarity and return top 3 results
    top_results = sorted(similarities, key=lambda x: x[1], reverse=True)[:3]
    
    return {"results": top_results}
