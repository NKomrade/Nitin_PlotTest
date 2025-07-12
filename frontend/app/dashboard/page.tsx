'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

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
          <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-black">Upload CSV</CardTitle>
              <CardDescription className="text-gray-600">
                Upload your dataset to create visualizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/upload">
                <Button className="w-full h-12 bg-black text-white hover:bg-black/80 border-2 border-black font-semibold text-base transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]">
                  Upload Data
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-black">Recent Uploads</CardTitle>
              <CardDescription className="text-gray-600">
                View your recent data uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 border-2 border-black">
                <p className="text-sm text-gray-700 font-medium text-center">No uploads yet</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}