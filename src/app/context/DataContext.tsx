'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { initialCategories, initialProducts } from '../data/initialData'

interface Category {
  id: number
  name: string
}

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

interface DataContextType {
  categories: Category[]
  products: Product[]
  isLoading: boolean
  error: string | null
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>
  updateCategory: (id: number, category: Partial<Category>) => Promise<void>
  deleteCategory: (id: number) => Promise<void>
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  getProductsByCategory: (categoryId: number) => Product[]
  getProductById: (id: number) => Product | undefined
  getCategoryById: (id: number) => Category | undefined
  uploadImage: (file: File) => Promise<string>
  addProductImage: (productId: number, image: File) => Promise<void>
  removeProductImage: (productId: number, imageId: number) => Promise<void>
  setMainProductImage: (productId: number, imageId: number) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize data from localStorage or use initial data
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true)
        const storedCategories = localStorage.getItem('categories')
        const storedProducts = localStorage.getItem('products')

        if (storedCategories && storedProducts) {
          const parsedCategories = JSON.parse(storedCategories)
          const parsedProducts = JSON.parse(storedProducts)
          
          // Validate the data
          if (Array.isArray(parsedCategories) && Array.isArray(parsedProducts)) {
            setCategories(parsedCategories)
            setProducts(parsedProducts)
          } else {
            throw new Error('Invalid stored data format')
          }
        } else {
          // Update image URLs to use a default placeholder
          const productsWithDefaultImages = initialProducts.map(product => ({
            ...product,
            images: product.images.map(img => ({
              ...img,
              url: '/images/placeholder.jpg'
            }))
          }))
          
          setCategories(initialCategories)
          setProducts(productsWithDefaultImages)
          localStorage.setItem('categories', JSON.stringify(initialCategories))
          localStorage.setItem('products', JSON.stringify(productsWithDefaultImages))
        }
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load data. Please try refreshing the page.')
        
        // Reset to initial data on error
        setCategories(initialCategories)
        setProducts(initialProducts)
      } finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('categories', JSON.stringify(categories))
        localStorage.setItem('products', JSON.stringify(products))
      } catch (err) {
        console.error('Error saving data:', err)
      }
    }
  }, [categories, products, isLoading])

  const addCategory = async (category: Omit<Category, 'id'>): Promise<void> => {
    try {
      // Validate category name
      if (!category.name.trim()) {
        throw new Error('Category name is required')
      }

      // Check for duplicate category names
      if (categories.some(c => c.name.toLowerCase() === category.name.toLowerCase())) {
        throw new Error('A category with this name already exists')
      }

      const newId = Math.max(0, ...categories.map(c => c.id)) + 1
      const newCategory = { ...category, id: newId }
      
      setCategories(prev => [...prev, newCategory])
      console.log('Category added successfully:', newCategory)
    } catch (error) {
      console.error('Error adding category:', error)
      throw error
    }
  }

  const updateCategory = async (id: number, category: Partial<Category>): Promise<void> => {
    try {
      // Validate category name if provided
      if (category.name && !category.name.trim()) {
        throw new Error('Category name is required')
      }

      // Check for duplicate category names
      if (category.name && categories.some(c => 
        c.id !== id && c.name.toLowerCase() === category.name.toLowerCase()
      )) {
        throw new Error('A category with this name already exists')
      }

      setCategories(prev => prev.map(c => c.id === id ? { ...c, ...category } : c))
      console.log('Category updated successfully:', { id, ...category })
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  }

  const deleteCategory = async (id: number): Promise<void> => {
    try {
      // Check if category exists
      const category = categories.find(c => c.id === id)
      if (!category) {
        throw new Error('Category not found')
      }

      // Check if category has products
      const hasProducts = products.some(p => p.categoryId === id)
      if (hasProducts) {
        throw new Error('Cannot delete category with associated products')
      }

      setCategories(prev => prev.filter(c => c.id !== id))
      console.log('Category deleted successfully:', id)
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  }

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      // Validate required fields
      if (!product.name.trim()) {
        throw new Error('Product name is required')
      }
      if (!product.description.trim()) {
        throw new Error('Product description is required')
      }
      if (!product.categoryId) {
        throw new Error('Product category is required')
      }
      if (product.price < 0) {
        throw new Error('Product price cannot be negative')
      }
      if (product.stock < 0) {
        throw new Error('Product stock cannot be negative')
      }
      if (!product.sku.trim()) {
        throw new Error('Product SKU is required')
      }

      // Check if category exists
      const category = categories.find(c => c.id === product.categoryId)
      if (!category) {
        throw new Error('Selected category does not exist')
      }

      // Check for duplicate SKU
      if (products.some(p => p.sku.toLowerCase() === product.sku.toLowerCase())) {
        throw new Error('A product with this SKU already exists')
      }

      const newId = Math.max(0, ...products.map(p => p.id)) + 1
      const now = Date.now()
      const newProduct = {
        ...product,
        id: newId,
        createdAt: now,
        updatedAt: now,
        images: product.images || [{ id: Date.now(), url: '/images/placeholder.jpg', isMain: true }]
      }

      setProducts(prev => [...prev, newProduct])
      console.log('Product added successfully:', newProduct)
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  }

  const updateProduct = async (id: number, product: Partial<Product>): Promise<void> => {
    try {
      // Check if product exists
      const existingProduct = products.find(p => p.id === id)
      if (!existingProduct) {
        throw new Error('Product not found')
      }

      // Validate fields if provided
      if (product.name && !product.name.trim()) {
        throw new Error('Product name is required')
      }
      if (product.description && !product.description.trim()) {
        throw new Error('Product description is required')
      }
      if (product.price !== undefined && product.price < 0) {
        throw new Error('Product price cannot be negative')
      }
      if (product.stock !== undefined && product.stock < 0) {
        throw new Error('Product stock cannot be negative')
      }
      if (product.sku && !product.sku.trim()) {
        throw new Error('Product SKU is required')
      }

      // Check if category exists if provided
      if (product.categoryId) {
        const category = categories.find(c => c.id === product.categoryId)
        if (!category) {
          throw new Error('Selected category does not exist')
        }
      }

      // Check for duplicate SKU if provided
      if (product.sku && products.some(p => 
        p.id !== id && p.sku.toLowerCase() === product.sku.toLowerCase()
      )) {
        throw new Error('A product with this SKU already exists')
      }

      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, ...product, updatedAt: Date.now() } : p
      ))
      console.log('Product updated successfully:', { id, ...product })
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  const deleteProduct = async (id: number): Promise<void> => {
    try {
      // Check if product exists
      const product = products.find(p => p.id === id)
      if (!product) {
        throw new Error('Product not found')
      }

      setProducts(prev => prev.filter(p => p.id !== id))
      console.log('Product deleted successfully:', id)
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  const getProductsByCategory = (categoryId: number) => {
    return products.filter(p => p.categoryId === categoryId)
  }

  const getProductById = (id: number) => {
    return products.find(p => p.id === id)
  }

  const getCategoryById = (id: number) => {
    return categories.find(c => c.id === id)
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      // In a real application, this would upload to a server
      // For now, we'll just return a placeholder URL
      return '/images/placeholder.jpg'
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  const addProductImage = async (productId: number, image: File): Promise<void> => {
    try {
      // Check if product exists
      const product = products.find(p => p.id === productId)
      if (!product) {
        throw new Error('Product not found')
      }

      const imageUrl = await uploadImage(image)
      setProducts(prev => prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            images: [...p.images, { id: Date.now(), url: imageUrl, isMain: false }]
          }
        }
        return p
      }))
      console.log('Product image added successfully:', { productId, imageUrl })
    } catch (error) {
      console.error('Error adding product image:', error)
      throw error
    }
  }

  const removeProductImage = async (productId: number, imageId: number): Promise<void> => {
    try {
      // Check if product exists
      const product = products.find(p => p.id === productId)
      if (!product) {
        throw new Error('Product not found')
      }

      // Check if image exists
      const image = product.images.find(img => img.id === imageId)
      if (!image) {
        throw new Error('Image not found')
      }

      setProducts(prev => prev.map(p => {
        if (p.id === productId) {
          const images = p.images.filter(img => img.id !== imageId)
          // If we removed the main image, make the first remaining image the main one
          if (images.length > 0 && !images.some(img => img.isMain)) {
            images[0].isMain = true
          }
          return { ...p, images }
        }
        return p
      }))
      console.log('Product image removed successfully:', { productId, imageId })
    } catch (error) {
      console.error('Error removing product image:', error)
      throw error
    }
  }

  const setMainProductImage = async (productId: number, imageId: number): Promise<void> => {
    try {
      // Check if product exists
      const product = products.find(p => p.id === productId)
      if (!product) {
        throw new Error('Product not found')
      }

      // Check if image exists
      const image = product.images.find(img => img.id === imageId)
      if (!image) {
        throw new Error('Image not found')
      }

      setProducts(prev => prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            images: p.images.map(img => ({
              ...img,
              isMain: img.id === imageId
            }))
          }
        }
        return p
      }))
      console.log('Main product image set successfully:', { productId, imageId })
    } catch (error) {
      console.error('Error setting main product image:', error)
      throw error
    }
  }

  const value = {
    categories,
    products,
    isLoading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductById,
    getCategoryById,
    uploadImage,
    addProductImage,
    removeProductImage,
    setMainProductImage
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
} 