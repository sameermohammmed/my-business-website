'use client'

import React from 'react'
import AdminDashboard from '../components/admin/AdminDashboard'
import { DataProvider } from '../context/DataContext'

export default function AdminPage() {
  return (
    <DataProvider>
      <AdminDashboard />
    </DataProvider>
  )
} 