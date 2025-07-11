import pandas as pd
from typing import List, Dict, Any

def generate_plot_data(file_path: str, x_axis: str, y_axis: str) -> List[Dict[str, Any]]:
    try:
        # Read CSV file
        df = pd.read_csv(file_path)
        
        # Validate columns exist
        if x_axis not in df.columns or y_axis not in df.columns:
            raise ValueError("Selected columns not found in dataset")
        
        # Filter out non-numeric values and NaN
        plot_df = df[[x_axis, y_axis]].copy()
        plot_df = plot_df.dropna()
        
        # Convert to numeric if possible
        try:
            plot_df[x_axis] = pd.to_numeric(plot_df[x_axis], errors='coerce')
            plot_df[y_axis] = pd.to_numeric(plot_df[y_axis], errors='coerce')
        except:
            pass
        
        # Remove rows with NaN values after conversion
        plot_df = plot_df.dropna()
        
        # Create plot data
        plot_data = []
        for index, row in plot_df.iterrows():
            plot_data.append({
                "x": float(row[x_axis]) if pd.notna(row[x_axis]) else 0,
                "y": float(row[y_axis]) if pd.notna(row[y_axis]) else 0,
                "id": int(index)
            })
        
        return plot_data
        
    except Exception as e:
        raise Exception(f"Error generating plot data: {str(e)}")

def get_column_stats(file_path: str, column: str) -> Dict[str, Any]:
    try:
        df = pd.read_csv(file_path)
        
        if column not in df.columns:
            raise ValueError(f"Column '{column}' not found in dataset")
        
        series = pd.to_numeric(df[column], errors='coerce')
        series = series.dropna()
        
        return {
            "min": float(series.min()),
            "max": float(series.max()),
            "mean": float(series.mean()),
            "median": float(series.median()),
            "std": float(series.std()),
            "count": int(series.count())
        }
        
    except Exception as e:
        raise Exception(f"Error calculating column stats: {str(e)}")