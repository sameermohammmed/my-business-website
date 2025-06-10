/**
 * Category interface for product categories
 */
export interface Category {
  id: number
  name: string
  products: Product[]
}

/**
 * ProductImage interface for product images
 */
export interface ProductImage {
  id: number
  url: string
  isMain: boolean
}

/**
 * GalleryImage interface for gallery images
 */
export interface GalleryImage {
  id: number
  url: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Product interface for product data
 */
export interface Product {
  id: number
  name: string
  description: string
  categoryId: number
  price: number
  stock: number
  sku: string
  specifications: Record<string, string | undefined>
  features: string[]
  images: ProductImage[]
  isPublished: boolean
  createdAt: number
  updatedAt: number
}

/**
 * DataContextType interface for the data context
 */
export interface DataContextType {
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
  getPublishedProducts: () => Product[]
  getProductsByCategory: (categoryId: number) => Product[]
  getProductById: (id: number) => Product | undefined
  getCategoryById: (id: number) => Category | undefined
  uploadImage: (file: File) => Promise<string>
  addProductImage: (productId: number, image: File) => Promise<void>
  removeProductImage: (productId: number, imageId: number) => Promise<void>
  setMainProductImage: (productId: number, imageId: number) => Promise<void>
  refreshCategories: () => Promise<void>
} 