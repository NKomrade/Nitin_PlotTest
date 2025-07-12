'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white border-b border-black shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="text-2xl font-bold text-black hover:text-gray-800 transition-colors duration-200">
            DataViz Pro
          </Link>
          
          <div className="flex items-center space-x-6">
            {session && (
              <>
                <div className="bg-black text-white px-4 py-2 border-2 border-black">
                  <span className="text-sm font-medium">
                    Welcome, {session.user?.name}
                  </span>
                </div>
                <Button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-white text-black hover:bg-gray-100 border-2 border-black font-semibold transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
                  size="sm"
                >
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}