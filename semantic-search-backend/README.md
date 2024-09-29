In the semantic-search-backend create python virtual env
python3 -m venv semantic-search-env

Activate semantic-search-env on Mac
source semantic-search-env/bin/activate

Activate semantic-search-env on Windows
.\semantic-search-env\Scripts\activate.bat

After activating venv in semantic-search-backend directory

pip install fastapi uvicorn sentence-transformers pydantic sqlalchemy psycopg2 pdfplumber

uvicorn main:app --reload
