from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
from app.models.csv_data import CSVResponse
from app.models.user import UserResponse
from app.routes.auth import get_current_user
from app.utils.csv_handler import process_csv_file, validate_csv_file
from app.database import get_database
from datetime import datetime
import uuid
import os

router = APIRouter()

@router.post("/", response_model=CSVResponse)
async def upload_csv(
    file: UploadFile = File(...),
    current_user: UserResponse = Depends(get_current_user)
):
    # Validate file
    if not file.filename.endswith('.csv'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV files are allowed"
        )
    
    try:
        # Read and validate CSV
        file_content = await file.read()
        csv_data = validate_csv_file(file_content)
        
        # Save file
        file_id = str(uuid.uuid4())
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, f"{file_id}.csv")
        with open(file_path, "wb") as f:
            f.write(file_content)
        
        # Process CSV data
        processed_data = process_csv_file(file_content)
        
        # Store metadata in database
        db = get_database()
        csv_doc = {
            "_id": file_id,
            "filename": file.filename,
            "columns": processed_data["columns"],
            "row_count": processed_data["row_count"],
            "file_size": len(file_content),
            "uploaded_at": datetime.utcnow(),
            "user_id": current_user.id,
            "file_path": file_path
        }
        
        db.csv_files.insert_one(csv_doc)
        
        return CSVResponse(
            id=file_id,
            filename=file.filename,
            columns=processed_data["columns"],
            row_count=processed_data["row_count"],
            file_size=len(file_content),
            uploaded_at=csv_doc["uploaded_at"],
            user_id=current_user.id,
            file_id=file_id,
            data=processed_data["data"][:100]  # Return first 100 rows for preview
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error processing CSV: {str(e)}"
        )

@router.get("/files")
async def get_user_files(current_user: UserResponse = Depends(get_current_user)):
    db = get_database()
    files = list(db.csv_files.find({"user_id": current_user.id}))
    
    return [
        {
            "id": file["_id"],
            "filename": file["filename"],
            "columns": file["columns"],
            "row_count": file["row_count"],
            "uploaded_at": file["uploaded_at"]
        }
        for file in files
    ]