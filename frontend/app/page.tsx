'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (session) {
      router.push('/dashboard')
    }
  }, [session, status, router])

  return (
    <div className="h-screen bg-white overflow-hidden flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-black mb-4 tracking-tight">
            DataViz Pro
          </h1>
        </div>
        
        {/* Main Content */}
        <div className="max-w-md mx-auto">
          <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-black mb-2">
                Get Started
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Upload your CSV data and create interactive scatter plots
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-8 pt-0">
              <Link href="/auth/signin">
                <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 border-2 border-black font-semibold text-base transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full h-12 bg-white text-black hover:bg-gray-100 border-2 border-black font-semibold text-base transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]">
                  Sign Up
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        
      </div>
    </div>
  )
}