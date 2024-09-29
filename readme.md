Project Overview: Semantic Search Application

1. Objective
   The main goal of this project is to build a semantic search application that allows users to upload text-based documents (like PDFs or TXT files) and perform natural language searches on them. Unlike traditional keyword searches, the application aims to return results based on the meaning or intent behind the search query, leveraging modern machine learning techniques for better accuracy and relevance.

2. Architecture
   The project is structured into two main components:

Backend:

Responsible for handling document uploads, processing them, generating embeddings, and executing semantic searches.
Built using FastAPI, a modern web framework for building APIs.

Frontend:

A user-friendly web interface for users to upload documents, input search queries, and view results.
Developed using React, a popular JavaScript library for building user interfaces. 3. Key Features
Document Upload: Users can upload multiple text-based documents.
Natural Language Search: Users can enter natural language queries to search the documents.
Semantic Similarity: Results are ranked based on semantic relevance rather than just keyword matching.
Responsive Design: The frontend is designed to be intuitive and user-friendly. 4. Technologies Used
FastAPI: For building the backend API.
Uvicorn: ASGI server for running the FastAPI application.
SQLAlchemy: For interacting with the database.
PostgreSQL: Relational database for storing documents and their embeddings.
Sentence Transformers: Pre-trained models for generating embeddings.
Material-UI: A popular React UI framework to enhance the frontend design.
pdfplumber: For extracting text from PDF files. 5. How It Works
Document Upload:

Users upload documents through the React frontend.
The uploaded files are sent to the FastAPI backend via a POST request.
Text Extraction:

The backend extracts text content from the uploaded documents using pdfplumber for PDFs and handles TXT files directly.
If the document is scanned, Optical Character Recognition (OCR) can be implemented using tools like Tesseract.
Embedding Generation:

Once the text is extracted, the backend uses a pre-trained model from the sentence-transformers library to generate vector embeddings of the document content.
These embeddings are stored in a PostgreSQL database along with the document's metadata (like filename).
Search Functionality:

When a user enters a search query, the backend generates an embedding for the query as well.
The application retrieves all document embeddings from the database and computes their similarity to the query embedding using cosine similarity.
The top results (most similar documents) are then returned to the frontend.
Displaying Results:

The frontend displays the ranked search results to the user, showing relevant document names and their similarity scores. 6. User Experience
Responsive UI: The React frontend uses Material-UI to create a visually appealing and responsive user interface.
Feedback Mechanism: After uploading a document, users receive immediate feedback through Snackbar notifications.
Simple Interaction: Users can easily switch between uploading documents and searching queries, with clear labels and buttons.
