'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/app/context/DataContext'
import { generateProductCode } from '@/app/utils/productUtils'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface ProductFormProps {
  initialData?: {
    id?: number
    name: string
    description: string
    categoryId: number
    price: number
    stock: number
    sku: string
    specifications: Record<string, string>
    features: string[]
    images: { id: number; url: string; isMain: boolean }[]
    isPublished: boolean
  }
  mode: 'create' | 'edit'
}

export default function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter()
  const { categories, addProduct, updateProduct } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    categoryId: initialData?.categoryId || categories[0]?.id || 0,
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    sku: initialData?.sku || generateProductCode(),
    specifications: initialData?.specifications || {},
    features: initialData?.features || [''],
    images: initialData?.images || [],
    isPublished: initialData?.isPublished || false
  })

  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      isMain: formData.images.length === 0 && index === 0
    }))

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
  }

  const handleRemoveImage = (imageId: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }))
  }

  const handleSetMainImage = (imageId: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map(img => ({
        ...img,
        isMain: img.id === imageId
      }))
    }))
  }

  const handleAddSpecification = () => {
    if (!specKey || !specValue) return

    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [specKey]: specValue
      }
    }))

    setSpecKey('')
    setSpecValue('')
  }

  const handleRemoveSpecification = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications }
      delete newSpecs[key]
      return { ...prev, specifications: newSpecs }
    })
  }

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      if (mode === 'create') {
        await addProduct(formData)
      } else if (initialData?.id) {
        await updateProduct(initialData.id, formData)
      }
      router.push('/admin/dashboard')
    } catch (err) {
      setError('Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            required
            value={formData.categoryId}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            required
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            required
            value={formData.sku}
            onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <div className="mt-1">
          <ReactQuill
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            className="h-48 mb-12"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Specifications</label>
        <div className="mt-1 space-y-2">
          {Object.entries(formData.specifications).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{key}:</span>
              <span className="text-sm text-gray-900">{value}</span>
              <button
                type="button"
                onClick={() => handleRemoveSpecification(key)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex space-x-2">
            <input
              type="text"
              value={specKey}
              onChange={(e) => setSpecKey(e.target.value)}
              placeholder="Key"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
              placeholder="Value"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddSpecification}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Features</label>
        <div className="mt-1 space-y-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...formData.features]
                  newFeatures[index] = e.target.value
                  setFormData(prev => ({ ...prev, features: newFeatures }))
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFeature}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Feature
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <div className="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {formData.images.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.url}
                alt="Product"
                className={`h-32 w-full object-cover rounded-lg ${
                  image.isMain ? 'ring-2 ring-indigo-500' : ''
                }`}
              />
              <div className="absolute top-2 right-2 space-x-2">
                <button
                  type="button"
                  onClick={() => handleSetMainImage(image.id)}
                  className={`p-1 rounded-full ${
                    image.isMain
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Set Main
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                  className="p-1 rounded-full bg-white text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <label className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="text-gray-500">Add Images</span>
          </label>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublished"
          checked={formData.isPublished}
          onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
          Publish Product
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
        </button>
      </div>
    </form>
  )
} 