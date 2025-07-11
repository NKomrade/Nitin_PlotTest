import pandas as pd
import io
from typing import Dict, List, Any
from fastapi import HTTPException

def validate_csv_file(file_content: bytes) -> Dict[str, Any]:
    try:
        # Read CSV
        df = pd.read_csv(io.BytesIO(file_content))
        
        # Check if file has at least 5 columns
        if len(df.columns) < 5:
            raise HTTPException(
                status_code=400,
                detail="CSV file must have at least 5 columns"
            )
        
        # Check if columns are mostly numeric
        numeric_columns = df.select_dtypes(include=['number']).columns.tolist()
        if len(numeric_columns) < 5:
            raise HTTPException(
                status_code=400,
                detail="CSV file must have at least 5 numeric columns"
            )
        
        return {
            "columns": df.columns.tolist(),
            "numeric_columns": numeric_columns,
            "row_count": len(df),
            "valid": True
        }
        
    except pd.errors.EmptyDataError:
        raise HTTPException(
            status_code=400,
            detail="CSV file is empty"
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading CSV file: {str(e)}"
        )

def process_csv_file(file_content: bytes) -> Dict[str, Any]:
    try:
        df = pd.read_csv(io.BytesIO(file_content))
        
        # Convert to dictionary
        data = df.to_dict('records')
        
        return {
            "columns": df.columns.tolist(),
            "row_count": len(df),
            "data": data
        }
        
    except Exception as e:
        raise Exception(f"Error processing CSV: {str(e)}")

def read_csv_for_plotting(file_path: str) -> pd.DataFrame:
    try:
        return pd.read_csv(file_path)
    except Exception as e:
        raise Exception(f"Error reading CSV file: {str(e)}")