'use client'

import { DataProvider } from './context/DataContext'
import { SearchProvider } from './context/DataContext'
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
    <SearchProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </SearchProvider>
  )
} 