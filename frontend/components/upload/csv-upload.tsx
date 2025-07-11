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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
      setError('')
    } else {
      setError('Please select a valid CSV file')
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
          'Authorization': `Bearer ${session?.accessToken}`
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload CSV File</CardTitle>
          <CardDescription>
            Upload a CSV file with at least 5 numeric columns for visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          
          {file && (
            <div className="text-sm text-gray-600">
              Selected file: {file.name}
            </div>
          )}
          
          <Button 
            onClick={handleUpload} 
            disabled={!file || loading}
            className="w-full"
          >
            {loading ? 'Uploading...' : 'Upload CSV'}
          </Button>
        </CardContent>
      </Card>

      {uploadData && (
        <Card>
          <CardHeader>
            <CardTitle>Create Visualization</CardTitle>
            <CardDescription>
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