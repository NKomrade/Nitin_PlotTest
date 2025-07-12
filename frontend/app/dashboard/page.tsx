'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { apiClient } from '@/lib/api'

interface UploadedFile {
  id: string
  filename: string
  columns: string[]
  row_count: number
  uploaded_at: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    
    fetchUploadedFiles()
  }, [session, status, router])

  const fetchUploadedFiles = async () => {
    try {
      const response = await apiClient.get('/upload/files', {
        headers: {
          'Authorization': `Bearer ${(session as any)?.accessToken}`
        }
      })
      setUploadedFiles(response.data)
    } catch (error) {
      console.error('Error fetching uploaded files:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="bg-white text-black p-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-lg">Welcome back, {session.user?.name}!</p>
          </div>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white h-[280px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-black">Upload CSV</CardTitle>
              <CardDescription className="text-gray-600">
                Upload your dataset to create visualizations
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <Link href="/upload">
                <Button className="w-full h-12 bg-black text-white hover:bg-black/80 border-2 border-black font-semibold text-base transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]">
                  Upload Data
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white h-[280px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-black">Recent Uploads</CardTitle>
              <CardDescription className="text-gray-600">
                View your recent data uploads
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              {loading ? (
                <div className="bg-gray-100 p-4 border-2 border-black">
                  <p className="text-sm text-gray-700 font-medium text-center">Loading...</p>
                </div>
              ) : uploadedFiles.length > 0 ? (
                <div className="h-full overflow-y-auto pr-2 space-y-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="bg-white p-3 border-2 border-gray-300 hover:border-black transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-black text-sm truncate">{file.filename}</p>
                          <p className="text-xs text-gray-600">{file.row_count} rows • {file.columns.length} columns</p>
                        </div>
                        <div className="text-right ml-2">
                          <p className="text-xs text-gray-500">
                            {new Date(file.uploaded_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 p-4 border-2 border-black h-full flex items-center justify-center">
                  <p className="text-sm text-gray-700 font-medium text-center">No uploads yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analytics Card */}
          <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white h-[280px] flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-black">Analytics</CardTitle>
              <CardDescription className="text-gray-600">
                View your data statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Files</span>
                  <span className="text-lg font-bold text-black">{uploadedFiles.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Rows</span>
                  <span className="text-lg font-bold text-black">
                    {uploadedFiles.reduce((sum, file) => sum + file.row_count, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Avg Columns</span>
                  <span className="text-lg font-bold text-black">
                    {uploadedFiles.length > 0 
                      ? Math.round(uploadedFiles.reduce((sum, file) => sum + file.columns.length, 0) / uploadedFiles.length)
                      : 0
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}