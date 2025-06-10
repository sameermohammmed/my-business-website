'use client'

import { useRouter } from 'next/navigation'
import { useData } from '@/app/context/DataContext'
import ProductForm from '@/app/admin/products/components/ProductForm'

export default function EditProduct({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getProductById } = useData()
  const product = getProductById(Number(params.id))

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Product Not Found</h1>
            <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Product</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <ProductForm
            mode="edit"
            initialData={{
              ...product,
              specifications: Object.fromEntries(
                Object.entries(product.specifications || {}).filter(([_, v]) => typeof v === 'string')
              ) as Record<string, string>
            }}
          />
        </div>
      </div>
    </div>
  )
} 