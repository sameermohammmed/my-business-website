'use client'
import Link from 'next/link'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AdminNavigation() {
  const router = useRouter()

  const handleLogout = () => {
    // Clear any admin session data here
    router.push('/admin')
  }

  return (
    <div className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center p-4">
          {/* Logo and Company Name */}
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-xl sm:text-2xl font-bold hover:text-blue-200">
            <div className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full p-1 shadow relative">
              <Image
                src="/images/IKLOGO.jpg"
                alt="I K Engineering Company Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline">I K ENGINEERING COMPANY</span>
            <span className="sm:hidden">I K</span>
          </Link>

          {/* Admin Navigation */}
          <div className="flex items-center space-x-6">
            <Link href="/admin/dashboard" className="hover:text-blue-200">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="flex items-center hover:text-blue-200"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 