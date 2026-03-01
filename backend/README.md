# 🧠 Intelligent Multi-PDF RAG System — Backend

Production-ready FastAPI backend for the Intelligent Multi-PDF RAG System with Long-Term Memory.

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app entry point & factory
│   ├── config.py             # Pydantic Settings (env vars)
│   ├── database.py           # Async SQLAlchemy engine & session
│   ├── models/
│   │   └── chat.py           # ChatHistory ORM model
│   ├── schemas/
│   │   └── chat.py           # Pydantic request/response schemas
│   ├── routes/
│   │   ├── health.py         # GET /health
│   │   └── chat.py           # POST /chat
│   ├── services/
│   │   └── rag_service.py    # RAG pipeline service (pluggable)
│   └── utils/                # Utility functions (future)
├── requirements.txt
├── .env                      # Environment variables
└── README.md
```

---

## ⚙️ Prerequisites

- **Python 3.11+**
- **PostgreSQL 14+** (running locally or via Docker)
- **pip** or **pipenv**

---

## 🚀 Setup Instructions

### 1. Clone & Navigate

```bash
cd backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment

Edit the `.env` file with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=ragdb
```

### 5. Create the Database

Make sure PostgreSQL is running, then create the database:

```sql
CREATE DATABASE ragdb;
```

### 6. Run the Server

```bash
uvicorn app.main:app --reload
```

The server will start at **http://localhost:8000**.

---

## 📡 API Endpoints

| Method | Path      | Description                                    |
|--------|-----------|------------------------------------------------|
| GET    | `/health` | Health check — returns service status           |
| POST   | `/chat`   | Send a question and receive an AI-powered answer |

### `GET /health`

**Response:**

```json
{
  "status": "healthy",
  "service": "Intelligent Multi-PDF RAG System",
  "version": "1.0.0"
}
```

### `POST /chat`

**Request Body:**

```json
{
  "session_id": "session-abc-123",
  "question": "What are the key findings in the annual report?"
}
```

**Response:**

```json
{
  "answer": "[Infrastructure Mode] Received your question...",
  "confidence": 0.87,
  "sources": ["doc1.pdf", "doc2.pdf"]
}
```

---

## 📖 Interactive Docs

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🏗️ Architecture Notes

- **Async-first:** All endpoints and database operations use `async/await` with `asyncpg`.
- **Clean architecture:** Routes → Services → Models separation.
- **Pluggable RAG:** The `RAGService` class is designed so you can swap in FAISS, Chroma, Pinecone, or any LangChain-compatible retriever without touching the API layer.
- **Dependency Injection:** Database sessions are injected via FastAPI's `Depends()` mechanism.
- **Auto-migration:** Database tables are created automatically on application startup.

---

## 🔮 Roadmap (Next Phases)

- [ ] PDF upload & text extraction
- [ ] Vector store integration (FAISS / Chroma)
- [ ] Real LLM connection (OpenAI / Ollama)
- [ ] Embedding pipeline
- [ ] Chat history retrieval endpoints
- [ ] Authentication & authorization
- [ ] Docker & docker-compose setup

---

## 📝 License

MIT
