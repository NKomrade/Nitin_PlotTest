from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.user import UserCreate, UserLogin, UserResponse, Token
from app.utils.auth import create_access_token, verify_password, get_password_hash, decode_access_token
from app.database import get_database
from datetime import datetime
import uuid

router = APIRouter()
security = HTTPBearer()

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate):
    db = get_database()
    
    # Check if user already exists
    existing_user = db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    user_id = str(uuid.uuid4())
    
    user_doc = {
        "_id": user_id,
        "email": user.email,
        "name": user.name,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }
    
    db.users.insert_one(user_doc)
    
    return UserResponse(
        id=user_id,
        email=user.email,
        name=user.name,
        created_at=user_doc["created_at"]
    )

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    db = get_database()
    
    # Find user
    user_doc = db.users.find_one({"email": user.email})
    if not user_doc or not verify_password(user.password, user_doc["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user_doc["_id"]})
    
    user_response = UserResponse(
        id=user_doc["_id"],
        email=user_doc["email"],
        name=user_doc["name"],
        created_at=user_doc["created_at"]
    )
    
    return Token(
        access_token=access_token,
        user=user_response
    )

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = decode_access_token(credentials.credentials)
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        
        db = get_database()
        user_doc = db.users.find_one({"_id": user_id})
        if not user_doc:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        return UserResponse(
            id=user_doc["_id"],
            email=user_doc["email"],
            name=user_doc["name"],
            created_at=user_doc["created_at"]
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )