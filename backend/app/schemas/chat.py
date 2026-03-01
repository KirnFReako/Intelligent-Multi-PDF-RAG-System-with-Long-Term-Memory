"""
Pydantic schemas for chat-related request and response payloads.

These schemas handle serialization, validation, and documentation
for the chat API endpoints.
"""

from datetime import datetime

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """
    Schema for incoming chat requests.

    Attributes:
        session_id: Unique identifier for the conversation session.
        question: The user's question to be answered by the RAG system.
    """

    session_id: str = Field(
        ...,
        min_length=1,
        max_length=255,
        description="Unique session identifier for grouping conversations.",
        examples=["session-abc-123"],
    )
    question: str = Field(
        ...,
        min_length=1,
        description="The user's question to be answered.",
        examples=["What are the key findings in the annual report?"],
    )


class ChatResponse(BaseModel):
    """
    Schema for chat endpoint responses.

    Attributes:
        answer: The AI-generated answer to the user's question.
        confidence: Confidence score of the answer (0.0 to 1.0).
        sources: List of source document filenames used to generate the answer.
    """

    answer: str = Field(
        ...,
        description="The AI-generated answer.",
    )
    confidence: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Confidence score between 0.0 and 1.0.",
        examples=[0.87],
    )
    sources: list[str] = Field(
        default_factory=list,
        description="List of source document filenames referenced.",
        examples=[["doc1.pdf", "doc2.pdf"]],
    )


class ChatHistoryResponse(BaseModel):
    """
    Schema for returning a single chat history record.

    Attributes:
        id: The database record ID.
        session_id: The session this message belongs to.
        question: The user's original question.
        answer: The AI-generated answer.
        created_at: Timestamp of when the exchange occurred.
    """

    id: int
    session_id: str
    question: str
    answer: str
    created_at: datetime

    class Config:
        from_attributes = True
