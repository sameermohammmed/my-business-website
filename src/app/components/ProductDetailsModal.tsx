'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaTimes, FaChevronLeft, FaChevronRight, FaPlus, FaTrash, FaStar, FaUpload, FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import { useData } from '../store/DataContext'

interface Product {
  id: number
  name: string
  description: string
  categoryId: number
  price: number
  stock: number
  sku: string
  specifications: Record<string, string>
  features: string[]
  images: { id: number; url: string; isMain: boolean }[]
  createdAt: number
  updatedAt: number
}

interface ProductDetailsModalProps {
  product: Product
  onClose: () => void
  onUpdate: (product: Partial<Product>) => Promise<void>
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  onImageRemove: (imageId: number) => Promise<void>
  onSetMainImage: (imageId: number) => Promise<void>
  isUploading: boolean
}

export default function ProductDetailsModal({
  product,
  onClose,
  onUpdate,
  onImageUpload,
  onImageRemove,
  onSetMainImage,
  isUploading
}: ProductDetailsModalProps) {
  const { categories, addProductImage, removeProductImage, setMainProductImage, uploadImage } = useData()
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>(product)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    setEditedProduct(product)
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      // Validate required fields
      if (!editedProduct.name?.trim()) {
        throw new Error('Product name is required')
      }
      if (!editedProduct.description?.trim()) {
        throw new Error('Product description is required')
      }
      if (!editedProduct.categoryId) {
        throw new Error('Please select a category')
      }
      if (!editedProduct.sku?.trim()) {
        throw new Error('Product SKU is required')
      }
      if (editedProduct.price === undefined || editedProduct.price < 0) {
        throw new Error('Please enter a valid price')
      }
      if (editedProduct.stock === undefined || editedProduct.stock < 0) {
        throw new Error('Please enter a valid stock quantity')
      }

      await onUpdate(editedProduct)
      setSuccessMessage('Product updated successfully')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update product')
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const mainImage = editedProduct.images?.find(img => img.isMain) || editedProduct.images?.[0]
  const category = categories.find(c => c.id === editedProduct.categoryId)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center">
            <FaCheck className="mr-2" />
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
            <FaExclamationTriangle className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={editedProduct.name || ''}
                onChange={(e) => setEditedProduct(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                value={editedProduct.sku || ''}
                onChange={(e) => setEditedProduct(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product SKU"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={editedProduct.price || 0}
                onChange={(e) => setEditedProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                step="0.01"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                value={editedProduct.stock || 0}
                onChange={(e) => setEditedProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                placeholder="Enter stock quantity"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editedProduct.description || ''}
                onChange={(e) => setEditedProduct(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={editedProduct.categoryId || ''}
                onChange={(e) => setEditedProduct(prev => ({ ...prev, categoryId: Number(e.target.value) }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  {editedProduct.images?.map(image => (
                    <div key={image.id} className="relative group">
                      <Image
                        src={image.url}
                        alt="Product"
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => onImageRemove(image.id)}
                          className="text-white hover:text-red-500"
                        >
                          <FaTimes />
                        </button>
                        {!image.isMain && (
                          <button
                            type="button"
                            onClick={() => onSetMainImage(image.id)}
                            className="text-white hover:text-blue-500 ml-2"
                          >
                            <FaCheck />
                          </button>
                        )}
                      </div>
                      {image.isMain && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <label className="flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <div className={`flex items-center space-x-2 ${
                    isUploading ? 'text-gray-400' : 'text-blue-600 hover:text-blue-700'
                  }`}>
                    <FaUpload />
                    <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                isSaving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 