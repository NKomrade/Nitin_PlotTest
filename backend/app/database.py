from pymongo import MongoClient
from app.config import settings
import logging

logger = logging.getLogger(__name__)

class MongoDB:
    client: MongoClient = None
    database = None

mongodb = MongoDB()

def get_database():
    return mongodb.database

def connect_to_mongo():
    try:
        mongodb.client = MongoClient(settings.MONGODB_URI)
        mongodb.database = mongodb.client.get_default_database()
        logger.info("Connected to MongoDB")
    except Exception as e:
        logger.error(f"Error connecting to MongoDB: {e}")
        raise

def close_mongo_connection():
    if mongodb.client:
        mongodb.client.close()
        logger.info("Disconnected from MongoDB")