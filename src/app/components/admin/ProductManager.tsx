'use client'

import React, { useState } from 'react'
import { useData } from '../../context/DataContext'
import Image from 'next/image'

interface ProductFormData {
  name: string
  description: string
  categoryId: number
  price: string
  stock: string
  sku: string
  specifications: { [key: string]: string }
  features: string[]
}

export default function ProductManager() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData()
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<{ id: number; data: ProductFormData } | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    categoryId: categories[0]?.id || 0,
    price: '',
    stock: '',
    sku: '',
    specifications: {},
    features: []
  })

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      images: [{ id: 1, url: '/images/placeholder.jpg', isMain: true }]
    }
    addProduct(newProduct)
    setIsAddingProduct(false)
    setFormData({
      name: '',
      description: '',
      categoryId: categories[0]?.id || 0,
      price: '',
      stock: '',
      sku: '',
      specifications: {},
      features: []
    })
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      }
      updateProduct(editingProduct.id, updatedProduct)
      setEditingProduct(null)
    }
  }

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
    }
  }

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value }
    }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-8">
      {/* Add Product Button */}
      {!isAddingProduct && !editingProduct && (
        <button
          onClick={() => setIsAddingProduct(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </button>
      )}

      {/* Add/Edit Product Form */}
      {(isAddingProduct || editingProduct) && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {isAddingProduct ? 'Add New Product' : 'Edit Product'}
          </h2>
          <form onSubmit={isAddingProduct ? handleAddProduct : handleUpdateProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
              <div className="space-y-2">
                {Object.entries(formData.specifications).map(([key, value], index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newSpecs = { ...formData.specifications }
                        delete newSpecs[key]
                        newSpecs[e.target.value] = value
                        setFormData({ ...formData, specifications: newSpecs })
                      }}
                      placeholder="Specification name"
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleSpecificationChange(key, e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newSpecs = { ...formData.specifications }
                        delete newSpecs[key]
                        setFormData({ ...formData, specifications: newSpecs })
                      }}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleSpecificationChange('', '')}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  Add Specification
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="Feature"
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  Add Feature
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isAddingProduct ? 'Add Product' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingProduct(false)
                  setEditingProduct(null)
                }}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="space-y-4">
          {products.map(product => {
            const category = categories.find(c => c.id === product.categoryId)
            return (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={product.images[0]?.url || '/images/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{category?.name}</p>
                    <p className="text-sm text-gray-600">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct({
                        id: product.id,
                        data: {
                          name: product.name,
                          description: product.description,
                          categoryId: product.categoryId,
                          price: product.price.toString(),
                          stock: product.stock.toString(),
                          sku: product.sku,
                          specifications: product.specifications,
                          features: product.features
                        }
                      })
                      setFormData({
                        name: product.name,
                        description: product.description,
                        categoryId: product.categoryId,
                        price: product.price.toString(),
                        stock: product.stock.toString(),
                        sku: product.sku,
                        specifications: product.specifications,
                        features: product.features
                      })
                    }}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 