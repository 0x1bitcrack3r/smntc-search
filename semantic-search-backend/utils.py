import io
import pdfplumber
import numpy as np

# Extract text from documents
def extract_text(filename, content):
    if filename.endswith(".pdf"):
        return extract_pdf_text(content)
    # Handle TXT and other text-based files here
    return content.decode("utf-8")

def extract_pdf_text(content):
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
        return text

# Cosine Similarity Calculation
def cosine_similarity(embedding1, embedding2):
    return np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))
