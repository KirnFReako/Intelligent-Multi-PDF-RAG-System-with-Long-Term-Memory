"""
Chat API endpoints.

Handles incoming chat requests, delegates to the RAG service,
persists conversation history, and returns structured responses.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.chat import ChatHistory
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.rag_service import RAGService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["Chat"])

# Singleton RAG service instance
rag_service = RAGService()


@router.post(
    "",
    status_code=status.HTTP_200_OK,
    summary="Send a chat message",
    description="Submit a question to the RAG system and receive an AI-generated answer.",
    response_model=ChatResponse,
)
async def chat(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
) -> ChatResponse:
    """
    Process a chat request through the RAG pipeline.

    Flow:
        1. Validate the incoming request.
        2. Call the RAG service to generate an answer.
        3. Persist the question and answer in PostgreSQL.
        4. Return the structured response to the client.

    Args:
        request: The validated chat request containing session_id and question.
        db: Injected async database session.

    Returns:
        ChatResponse with the generated answer, confidence score, and sources.

    Raises:
        HTTPException: 500 if answer generation or persistence fails.
    """
    try:
        # Generate answer via RAG service
        result = await rag_service.generate_answer(
            session_id=request.session_id,
            question=request.question,
        )

        # Persist to database
        chat_record = ChatHistory(
            session_id=request.session_id,
            question=request.question,
            answer=result["answer"],
        )
        db.add(chat_record)
        await db.flush()

        logger.info(
            "Chat recorded — session=%s, record_id=%s",
            request.session_id,
            chat_record.id,
        )

        return ChatResponse(
            answer=result["answer"],
            confidence=result["confidence"],
            sources=result["sources"],
        )

    except Exception as exc:
        logger.exception("Failed to process chat request: %s", str(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your request. Please try again.",
        ) from exc
