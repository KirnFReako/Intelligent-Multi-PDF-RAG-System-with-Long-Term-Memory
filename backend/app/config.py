"""
Application configuration module.

Loads environment variables and provides a centralized Settings object
using Pydantic's BaseSettings for validation and type safety.
"""

from functools import lru_cache
from urllib.parse import quote_plus
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.

    Attributes:
        APP_NAME: The display name of the application.
        APP_VERSION: Current application version string.
        DEBUG: Flag to enable debug mode (development only).
        DATABASE_URL: PostgreSQL connection string.
        OPENAI_API_KEY: API key for OpenAI services (optional placeholder).
        OLLAMA_BASE_URL: Base URL for local Ollama instance (optional placeholder).
        CORS_ORIGINS: Comma-separated list of allowed CORS origins.
    """

    APP_NAME: str = "Intelligent Multi-PDF RAG System"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Database
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "password"
    DB_NAME: str = "ragdb"

    # LLM Configuration (placeholders for future integration)
    OPENAI_API_KEY: str = ""
    OLLAMA_BASE_URL: str = "http://localhost:11434"

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse CORS_ORIGINS string into a list of origin URLs."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    @property
    def database_url(self) -> str:
        """Construct the full PostgreSQL connection URL from individual fields."""
        encoded_password = quote_plus(self.DB_PASSWORD)
        return (
            f"postgresql://{self.DB_USER}:{encoded_password}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )


@lru_cache()
def get_settings() -> Settings:
    """
    Return a cached Settings instance.

    Uses lru_cache to ensure the settings are only loaded once
    from the environment, improving performance.

    Returns:
        Settings: The application settings object.
    """
    return Settings()
