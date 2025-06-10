'use client'

import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminNavigation from './components/AdminNavigation'

/**
 * Admin layout component that handles authentication and layout for admin pages
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header Banner */}
      <div className="w-full bg-blue-800 text-white py-4 mb-8 text-center">
        <h1 className="text-3xl font-bold">I K ENGINEERING COMPANY - Admin Panel</h1>
      </div>
      
      {/* Admin Navigation - Only show when authenticated */}
      {isAuthenticated && <AdminNavigation />}
      
      {/* Main Content */}
      {children}
    </div>
  )
} 