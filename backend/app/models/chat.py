"""
Chat history ORM model.

Defines the ChatHistory table for persisting conversation data
between users and the RAG system.
"""

from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class ChatHistory(Base):
    """
    SQLAlchemy model for storing chat history entries.

    Each row represents a single question-answer exchange
    within a specific session.

    Attributes:
        id: Auto-incrementing primary key.
        session_id: Groups messages belonging to the same conversation session.
        question: The user's question text.
        answer: The AI-generated answer text.
        created_at: Timestamp of when the record was created (server-default).
    """

    __tablename__ = "chat_history"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
        index=True,
    )
    session_id: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )
    question: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    answer: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        return (
            f"<ChatHistory(id={self.id}, session_id='{self.session_id}', "
            f"created_at='{self.created_at}')>"
        )
