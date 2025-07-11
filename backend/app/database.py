from pymongo import MongoClient
from app.config import settings
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = None
database = None

def get_database():
    global client, database
    if database is None:
        try:
            client = MongoClient(settings.MONGODB_URI)
            # Test the connection
            client.admin.command('ping')
            
            # Explicitly specify database name
            database = client["datawiz"]  # Use your preferred database name
            
            logger.info(f"Connected to MongoDB database: datawiz")
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            return None
    return database