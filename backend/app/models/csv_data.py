from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class CSVUpload(BaseModel):
    filename: str
    columns: List[str]
    row_count: int
    file_size: int

class CSVResponse(BaseModel):
    id: str
    filename: str
    columns: List[str]
    row_count: int
    file_size: int
    uploaded_at: datetime
    user_id: str
    file_id: str
    data: List[Dict[str, Any]]
    
    class Config:
        from_attributes = True

class PlotRequest(BaseModel):
    file_id: str
    x_axis: str
    y_axis: str

class PlotResponse(BaseModel):
    plot_data: List[Dict[str, Any]]
    x_axis: str
    y_axis: str