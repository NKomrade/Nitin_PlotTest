export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export interface CSVData {
  id: string
  filename: string
  columns: string[]
  row_count: number
  uploaded_at: string
  user_id: string
}

export interface PlotData {
  x: number
  y: number
  id: string | number
}

export interface APIResponse<T = any> {
  data: T
  message: string
  status: number
}