from fastapi import APIRouter, HTTPException, Depends, status
from app.models.csv_data import PlotRequest, PlotResponse
from app.models.user import UserResponse
from app.routes.auth import get_current_user
from app.utils.plot_generator import generate_plot_data
from app.database import get_database
import os

router = APIRouter()

@router.post("/generate", response_model=PlotResponse)
async def generate_plot(
    plot_request: PlotRequest,
    current_user: UserResponse = Depends(get_current_user)
):
    db = get_database()
    
    # Find user and their uploaded files
    user = db.users.find_one({"_id": current_user.id})
    if not user or "uploaded_files" not in user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No uploaded files found"
        )
    
    # Find the specific file
    file_doc = None
    for file in user["uploaded_files"]:
        if file["file_id"] == plot_request.file_id:
            file_doc = file
            break
    
    if not file_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found"
        )
    
    # Check if columns exist
    if plot_request.x_axis not in file_doc["columns"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Column '{plot_request.x_axis}' not found in file"
        )
    
    if plot_request.y_axis not in file_doc["columns"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Column '{plot_request.y_axis}' not found in file"
        )
    
    try:
        # Generate plot data
        file_path = file_doc["file_path"]
        if not os.path.exists(file_path):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found on server"
            )
        
        plot_data = generate_plot_data(
            file_path,
            plot_request.x_axis,
            plot_request.y_axis
        )
        
        return PlotResponse(
            plot_data=plot_data,
            x_axis=plot_request.x_axis,
            y_axis=plot_request.y_axis
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating plot: {str(e)}"
        )