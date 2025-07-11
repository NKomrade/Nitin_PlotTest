# import os
# from typing import List
# from pydantic import BaseSettings

# class Settings(BaseSettings):
#     MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017/dataviz_pro")
#     JWT_SECRET: str = os.getenv("JWT_SECRET", "your-secret-key")
#     JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
#     JWT_EXPIRATION_TIME: int = int(os.getenv("JWT_EXPIRATION_TIME", "86400"))
#     UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
#     MAX_FILE_SIZE: int = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # 10MB
#     CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    
#     class Config:
#         env_file = ".env"

# settings = Settings()

import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017/datawiz"
    JWT_SECRET: str = "your-secret-key"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_TIME: int = 86400
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10485760  # 10MB
    CORS_ORIGINS: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return self.CORS_ORIGINS.split(",")

settings = Settings()