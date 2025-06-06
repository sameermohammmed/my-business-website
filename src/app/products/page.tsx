'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaThLarge, FaList, FaSortUp, FaSortDown } from 'react-icons/fa'
import { useData } from '../context/DataContext'
import Navigation from '../components/Navigation'
import ProductDetailView from '../components/ProductDetailView'

type SortField = 'name' | 'category' | 'id'
type SortOrder = 'asc' | 'desc'
type ViewMode = 'grid' | 'list'

export default function Products() {
  const { categories, products, isLoading: dataLoading, error } = useData()
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [isQuickView, setIsQuickView] = useState(false)
  const productsPerPage = 9

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  let filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory)
    : products

  filteredProducts = [...filteredProducts].sort((a, b) => {
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
        comparison = a.id - b.id
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => {
              setSelectedCategory(null)
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <FaList />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortField}
                onChange={(e) => handleSort(e.target.value as SortField)}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="id">Date Added</option>
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
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * productsPerPage) + 1} to {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-6"
        }>
          {paginatedProducts.map((product) => (
            <div 
              key={product.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'h-48'} group`}>
                <Image
                  src={product.images?.find(img => img.isMain)?.url || product.images?.[0]?.url || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/placeholder.jpg'
                  }}
                />
                {/* Quick View Button */}
                <button
                  onClick={() => {
                    setSelectedProductId(product.id)
                    setIsQuickView(true)
                  }}
                  className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <span className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                    Quick View
                  </span>
                </button>
              </div>
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''} flex flex-col h-[220px]`}>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2 h-[40px]">{product.description}</p>
                  <span className="text-sm text-gray-500 block h-[20px]">
                    {categories.find(c => c.id === product.categoryId)?.name}
                  </span>
                </div>
                <div className="mt-auto pt-4 space-y-2">
                  <button 
                    onClick={() => {
                      setSelectedProductId(product.id)
                      setIsQuickView(false)
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProductId(product.id)
                      setIsQuickView(true)
                    }}
                    className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white border disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProductId && (
          <ProductDetailView
            productId={selectedProductId}
            onClose={() => {
              setSelectedProductId(null)
              setIsQuickView(false)
            }}
            isQuickView={isQuickView}
          />
        )}
      </div>
    </div>
  )
} 