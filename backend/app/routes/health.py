"""
Health check endpoint.

Provides a simple liveness probe for monitoring and orchestration tools.
"""

from fastapi import APIRouter, status

router = APIRouter(tags=["Health"])


@router.get(
    "/health",
    status_code=status.HTTP_200_OK,
    summary="Health Check",
    description="Returns the current health status of the API server.",
    response_model=dict,
)
async def health_check() -> dict[str, str]:
    """
    Perform a basic health check.

    Returns:
        A dictionary indicating the service status.
    """
    return {
        "status": "healthy",
        "service": "Intelligent Multi-PDF RAG System",
        "version": "1.0.0",
    }
