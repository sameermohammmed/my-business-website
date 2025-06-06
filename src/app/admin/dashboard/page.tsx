'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaPlus, FaEdit, FaTrash, FaImage, FaTimes, FaThLarge, FaList, FaSort, FaSortUp, FaSortDown, FaTag, FaListUl, FaInfoCircle, FaSignOutAlt, FaUpload, FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import { useData } from '@/app/context/DataContext'
import AdminNavigation from '../../components/AdminNavigation'
import ProductDetailsModal from '../../components/ProductDetailsModal'
import { useRouter } from 'next/navigation'

type SortField = 'name' | 'category' | 'id'
type SortOrder = 'asc' | 'desc'
type ViewMode = 'grid' | 'list'

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

export default function AdminDashboard() {
  const { 
    categories, 
    products, 
    addCategory, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    addProductImage,
    removeProductImage,
    setMainProductImage,
    uploadImage
  } = useData()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    categoryId: 0,
    price: 0,
    stock: 0,
    sku: '',
    specifications: {},
    features: [],
    images: []
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()

  // Sort products based on current sort field and order
  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'category':
        const categoryA = categories.find(c => c.id === a.categoryId)?.name || ''
        const categoryB = categories.find(c => c.id === b.categoryId)?.name || ''
        comparison = categoryA.localeCompare(categoryB)
        break
      case 'id':
      default:
        comparison = a.id - b.id
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Handle category addition
  const handleAddCategory = async () => {
    try {
      if (!newCategory.trim()) {
        setUploadError('Category name is required')
        return
      }
      await addCategory({ name: newCategory.trim() })
      setNewCategory('')
      setIsAddingCategory(false)
      setSuccessMessage('Category added successfully')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to add category')
      setTimeout(() => setUploadError(null), 3000)
    }
  }

  // Handle product addition
  const handleAddProduct = async () => {
    try {
      if (!newProduct.name?.trim()) {
        setUploadError('Product name is required')
        return
      }
      if (!newProduct.description?.trim()) {
        setUploadError('Product description is required')
        return
      }
      if (!newProduct.categoryId) {
        setUploadError('Please select a category')
        return
      }
      if (!newProduct.sku?.trim()) {
        setUploadError('Product SKU is required')
        return
      }
      if (newProduct.price === undefined || newProduct.price < 0) {
        setUploadError('Please enter a valid price')
        return
      }
      if (newProduct.stock === undefined || newProduct.stock < 0) {
        setUploadError('Please enter a valid stock quantity')
        return
      }

      await addProduct({
        name: newProduct.name.trim(),
        description: newProduct.description.trim(),
        categoryId: newProduct.categoryId,
        price: newProduct.price,
        stock: newProduct.stock,
        sku: newProduct.sku.trim(),
        specifications: newProduct.specifications || {},
        features: newProduct.features || [],
        images: newProduct.images || []
      })

      setNewProduct({
        name: '',
        description: '',
        categoryId: 0,
        price: 0,
        stock: 0,
        sku: '',
        specifications: {},
        features: [],
        images: []
      })
      setIsAddingProduct(false)
      setSuccessMessage('Product added successfully')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to add product')
      setTimeout(() => setUploadError(null), 3000)
    }
  }

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      setUploadError(null)

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file')
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB')
      }

      if (selectedProduct) {
        await addProductImage(selectedProduct.id, file)
        setSuccessMessage('Image uploaded successfully')
        setTimeout(() => setSuccessMessage(null), 3000)
      } else if (isAddingProduct) {
        const imageUrl = await uploadImage(file)
        setNewProduct(prev => ({
          ...prev,
          images: [...(prev.images || []), { id: Date.now(), url: imageUrl, isMain: false }]
        }))
        setSuccessMessage('Image added successfully')
        setTimeout(() => setSuccessMessage(null), 3000)
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image')
      setTimeout(() => setUploadError(null), 3000)
    } finally {
      setIsUploading(false)
    }
  }

  // Handle image removal
  const handleRemoveImage = async (imageId: number) => {
    try {
      if (selectedProduct) {
        await removeProductImage(selectedProduct.id, imageId)
        setSuccessMessage('Image removed successfully')
        setTimeout(() => setSuccessMessage(null), 3000)
      } else if (isAddingProduct) {
        setNewProduct(prev => ({
          ...prev,
          images: (prev.images || []).filter(img => img.id !== imageId)
        }))
        setSuccessMessage('Image removed successfully')
        setTimeout(() => setSuccessMessage(null), 3000)
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to remove image')
      setTimeout(() => setUploadError(null), 3000)
    }
  }

  // Handle setting main image
  const handleSetMainImage = async (imageId: number) => {
    try {
      if (selectedProduct) {
        await setMainProductImage(selectedProduct.id, imageId)
        setSuccessMessage('Main image updated successfully')
        setTimeout(() => setSuccessMessage(null), 3000)
      } else if (isAddingProduct) {
        setNewProduct(prev => ({
          ...prev,
          images: (prev.images || []).map(img => ({
            ...img,
            isMain: img.id === imageId
          }))
        }))
        setSuccessMessage('Main image set successfully')
        setTimeout(() => setSuccessMessage(null), 3000)
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to set main image')
      setTimeout(() => setUploadError(null), 3000)
    }
  }

  // Handle edit product click
  const handleEditProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  // Handle delete product
  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId)
        setSuccessMessage('Product deleted successfully')
        setTimeout(() => setSuccessMessage(null), 3000)
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'Failed to delete product')
        setTimeout(() => setUploadError(null), 3000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center">
            <FaCheck className="mr-2" />
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {uploadError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
            <FaExclamationTriangle className="mr-2" />
            {uploadError}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsAddingCategory(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Category
            </button>
            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Add Category Modal */}
        {isAddingCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Add New Category</h2>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="w-full p-2 border rounded-lg mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setIsAddingCategory(false)
                    setNewCategory('')
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {isAddingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-xl font-bold mb-4">Add New Product</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="Enter product SKU"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newProduct.categoryId}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, categoryId: Number(e.target.value) }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select a category</option>
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
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
                    placeholder="Enter stock quantity"
                    min="0"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter product description"
                    rows={3}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                      {newProduct.images?.map(image => (
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
                              onClick={() => handleRemoveImage(image.id)}
                              className="text-white hover:text-red-500"
                            >
                              <FaTimes />
                            </button>
                            {!image.isMain && (
                              <button
                                onClick={() => handleSetMainImage(image.id)}
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
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                        <FaUpload />
                        <span>Upload Image</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setIsAddingProduct(false)
                    setNewProduct({
                      name: '',
                      description: '',
                      categoryId: 0,
                      price: 0,
                      stock: 0,
                      sku: '',
                      specifications: {},
                      features: [],
                      images: []
                    })
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Details Modal */}
        {isProductModalOpen && selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => {
              setIsProductModalOpen(false)
              setSelectedProduct(null)
            }}
            onUpdate={async (updatedProduct) => {
              try {
                await updateProduct(selectedProduct.id, updatedProduct)
                setSuccessMessage('Product updated successfully')
                setTimeout(() => setSuccessMessage(null), 3000)
              } catch (error) {
                setUploadError(error instanceof Error ? error.message : 'Failed to update product')
                setTimeout(() => setUploadError(null), 3000)
              }
            }}
            onImageUpload={handleImageUpload}
            onImageRemove={handleRemoveImage}
            onSetMainImage={handleSetMainImage}
            isUploading={isUploading}
          />
        )}

        {/* View Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
            >
              <FaList />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="p-2 border rounded-lg"
            >
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 text-gray-600"
            >
              {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
            </button>
          </div>
        </div>

        {/* Product Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedProducts.map(product => (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-square'}`}>
                <Image
                  src={product.images.find(img => img.isMain)?.url || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProductClick(product)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">${product.price.toFixed(2)}</span>
                  <span className="text-gray-600 text-sm">Stock: {product.stock}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {categories.find(c => c.id === product.categoryId)?.name || 'Uncategorized'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
} 