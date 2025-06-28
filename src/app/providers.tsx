'use client'

import { DataProvider, SearchProvider } from './context/DataContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AuthProvider>
      <SearchProvider>
        <DataProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </DataProvider>
      </SearchProvider>
    </AuthProvider>
  )
} 