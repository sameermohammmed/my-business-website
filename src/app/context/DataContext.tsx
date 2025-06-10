'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { initialCategories, initialProducts } from '../data/initialData'
import { Category, Product, GalleryImage } from '@/types'
import { getCategories } from '@/app/data/categories'

interface DataContextType {
  categories: Category[]
  products: Product[]
  galleryImages: GalleryImage[]
  isLoading: boolean
  error: string | null
  addCategory: (name: string) => void
  updateCategory: (id: number, name: string) => void
  deleteCategory: (id: number) => void
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  getPublishedProducts: () => Product[]
  getProductsByCategory: (categoryId: number) => Product[]
  getProductById: (id: number) => Product | undefined
  getCategoryById: (id: number) => Category | undefined
  uploadImage: (file: File) => Promise<string>
  addProductImage: (productId: number, image: File) => Promise<void>
  removeProductImage: (productId: number, imageId: number) => Promise<void>
  setMainProductImage: (productId: number, imageId: number) => Promise<void>
  addGalleryImage: (image: File, title: string, description?: string) => Promise<void>
  updateGalleryImage: (id: number, updates: Partial<Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>>) => void
  deleteGalleryImage: (id: number) => void
  refreshCategories: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

/**
 * DataProvider component that manages the application's data state
 * Handles categories and products data with localStorage persistence
 */
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
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

  const addCategory = async (name: string): Promise<void> => {
    try {
      // Validate category name
      if (!name.trim()) {
        throw new Error('Category name is required')
      }

      // Check for duplicate category names
      if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        throw new Error('A category with this name already exists')
      }

      const newId = Math.max(0, ...categories.map(c => c.id)) + 1
      const newCategory = { id: newId, name, products: [] }
      setCategories(prev => [...prev, newCategory])
    } catch (error) {
      console.error('Error adding category:', error)
      throw error
    }
  }

  const updateCategory = async (id: number, name: string): Promise<void> => {
    try {
      // Validate category name
      if (!name.trim()) {
        throw new Error('Category name is required')
      }

      // Check for duplicate category names
      if (categories.some(c => c.id !== id && c.name.toLowerCase() === name.toLowerCase())) {
        throw new Error('A category with this name already exists')
      }

      setCategories(prev => prev.map(c => c.id === id ? { ...c, name } : c))
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

      const newId = Math.max(0, ...products.map(p => p.id)) + 1
      const now = Date.now()
      const newProduct = {
        ...product,
        id: newId,
        createdAt: now,
        updatedAt: now
      }

      setProducts(prev => [...prev, newProduct])
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  }

  const updateProduct = async (id: number, product: Partial<Product>): Promise<void> => {
    try {
      // Validate required fields if provided
      if (product.name && !product.name.trim()) {
        throw new Error('Product name is required')
      }
      if (product.description && !product.description.trim()) {
        throw new Error('Product description is required')
      }

      setProducts(prev => prev.map(p => p.id === id ? {
        ...p,
        ...product,
        updatedAt: Date.now()
      } : p))
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  const deleteProduct = async (id: number): Promise<void> => {
    try {
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  const getPublishedProducts = () => {
    return products.filter(product => product.isPublished)
  }

  const getProductsByCategory = (categoryId: number) => {
    return products.filter(product => product.categoryId === categoryId)
  }

  const getProductById = (id: number) => {
    return products.find(product => product.id === id)
  }

  const getCategoryById = (id: number) => {
    return categories.find(category => category.id === id)
  }

  const uploadImage = async (file: File): Promise<string> => {
    // In a real application, this would upload to a server
    // For now, we'll just return a placeholder URL
    return '/images/placeholder.jpg'
  }

  const addProductImage = async (productId: number, image: File): Promise<void> => {
    try {
      const imageUrl = await uploadImage(image)
      const newImageId = Math.max(0, ...products
        .find(p => p.id === productId)?.images.map(img => img.id) || [0]) + 1

      setProducts(prev => prev.map(p => p.id === productId ? {
        ...p,
        images: [...p.images, { id: newImageId, url: imageUrl, isMain: false }]
      } : p))
    } catch (error) {
      console.error('Error adding product image:', error)
      throw error
    }
  }

  const removeProductImage = async (productId: number, imageId: number): Promise<void> => {
    try {
      setProducts(prev => prev.map(p => p.id === productId ? {
        ...p,
        images: p.images.filter(img => img.id !== imageId)
      } : p))
    } catch (error) {
      console.error('Error removing product image:', error)
      throw error
    }
  }

  const setMainProductImage = async (productId: number, imageId: number): Promise<void> => {
    try {
      setProducts(prev => prev.map(p => p.id === productId ? {
        ...p,
        images: p.images.map(img => ({
          ...img,
          isMain: img.id === imageId
        }))
      } : p))
    } catch (error) {
      console.error('Error setting main product image:', error)
      throw error
    }
  }

  const addGalleryImage = async (image: File, title: string, description?: string): Promise<void> => {
    try {
      const imageUrl = await uploadImage(image)
      const now = Date.now()
      const newImage: GalleryImage = {
        id: now,
        url: imageUrl,
        title,
        description: description || '',
        createdAt: new Date(now),
        updatedAt: new Date(now)
      }
      setGalleryImages(prev => [...prev, newImage])
    } catch (error) {
      console.error('Error adding gallery image:', error)
      throw error
    }
  }

  const updateGalleryImage = (id: number, updates: Partial<Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>>): void => {
    setGalleryImages(prev => prev.map(img => 
      img.id === id ? { ...img, ...updates, updatedAt: new Date() } : img
    ))
  }

  const deleteGalleryImage = (id: number): void => {
    setGalleryImages(prev => prev.filter(img => img.id !== id))
  }

  const refreshCategories = async () => {
    const data = await getCategories()
    setCategories(data)
  }

  useEffect(() => {
    refreshCategories()
  }, [])

  return (
    <DataContext.Provider
      value={{
        categories,
        products,
        galleryImages,
        isLoading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        addProduct,
        updateProduct,
        deleteProduct,
        getPublishedProducts,
        getProductsByCategory,
        getProductById,
        getCategoryById,
        uploadImage,
        addProductImage,
        removeProductImage,
        setMainProductImage,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        refreshCategories
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

/**
 * Custom hook to use the data context
 * @throws {Error} If used outside of DataProvider
 */
export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
} 