import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DataProvider } from './context/DataContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pro-Cursor',
  description: 'Your one-stop shop for all your needs',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  )
} 