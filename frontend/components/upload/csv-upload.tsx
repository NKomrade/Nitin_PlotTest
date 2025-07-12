'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScatterPlot } from '@/components/chart/scatter-plot'
import { apiClient } from '@/lib/api'

export function CSVUpload() {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadData, setUploadData] = useState<any>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    processFile(selectedFile)
  }

  const processFile = (selectedFile: File | undefined) => {
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
      setError('')
    } else {
      setError('Please select a valid CSV file')
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiClient.post('/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${(session as any)?.accessToken}`
        }
      })

      setUploadData(response.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">Upload CSV File</CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Upload a CSV file with at least 5 numeric columns for visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="border-2 border-red-500 bg-red-50">
              <AlertDescription className="text-red-700 font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          {/* Enhanced Drag and Drop Zone */}
          <div
            className={`relative border-2 border-dashed ${
              dragActive ? 'border-black bg-gray-50' : 'border-gray-400'
            } rounded-lg p-8 text-center transition-all duration-200 hover:border-black hover:bg-gray-50`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              {/* Upload Icon */}
              <div className="mx-auto w-16 h-16 bg-black flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              {/* Upload Text */}
              <div>
                <p className="text-lg font-semibold text-black mb-2">
                  {dragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file here'}
                </p>
                <p className="text-sm text-gray-600">
                  or <span className="font-semibold text-black">click to browse</span>
                </p>
              </div>
              
              {/* File Format Info */}
              <div className="bg-gray-100 p-3 border-2 border-gray-300 inline-block">
                <p className="text-xs text-gray-700 font-medium">Supported format: CSV files only</p>
              </div>
            </div>
          </div>
          
          {/* Selected File Display */}
          {file && (
            <div className="bg-black text-white p-4 border-2 border-black">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Selected file:</p>
                  <p className="text-sm">{file.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Upload Button */}
          <Button 
            onClick={handleUpload} 
            disabled={!file || loading}
            className="w-full h-12 bg-black text-white hover:bg-black/80 border-2 border-black font-semibold text-base transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uploading...
              </div>
            ) : (
              'Upload CSV'
            )}
          </Button>
        </CardContent>
      </Card>

      {uploadData && (
        <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black">Create Visualization</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Your data has been uploaded successfully. Create a scatter plot below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScatterPlot
              fileId={uploadData.file_id}
              columns={uploadData.columns}
              data={uploadData.data}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}