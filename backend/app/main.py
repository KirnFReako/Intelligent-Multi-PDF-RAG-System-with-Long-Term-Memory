"""
FastAPI application entry point.

Initializes the application, configures CORS middleware,
registers route modules, and handles database table creation on startup.
"""

import logging
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import Base, engine
from app.routes import health, chat

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """
    Application lifespan context manager.

    Handles startup and shutdown events:
        - Startup: Creates all database tables if they don't exist.
        - Shutdown: Disposes the database engine connection pool.
    """
    # — Startup —
    logger.info("Starting %s v%s", settings.APP_NAME, settings.APP_VERSION)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables verified / created.")

    yield

    # — Shutdown —
    logger.info("Shutting down %s...", settings.APP_NAME)
    await engine.dispose()
    logger.info("Database connection pool disposed.")


def create_app() -> FastAPI:
    """
    Application factory.

    Creates and configures a FastAPI instance with:
        - Metadata (title, version, description)
        - CORS middleware
        - Route registration
        - Lifespan event handlers

    Returns:
        A fully configured FastAPI application instance.
    """
    application = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description=(
            "Backend API for the Intelligent Multi-PDF RAG System "
            "with Long-Term Memory. Provides chat endpoints powered "
            "by LangChain and PostgreSQL-backed conversation history."
        ),
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # CORS middleware
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register routers
    application.include_router(health.router)
    application.include_router(chat.router)

    logger.info(
        "CORS enabled for origins: %s",
        settings.cors_origins_list,
    )

    return application


app = create_app()
