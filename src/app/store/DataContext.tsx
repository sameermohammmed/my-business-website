'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface Category {
  id: number
  name: string
}

interface ProductImage {
  id: number
  url: string
  isMain: boolean
}

interface Product {
  id: number
  name: string
  description: string
  categoryId: number
  price: number
  stock: number
  sku: string
  specifications: { [key: string]: string }
  features: string[]
  images: ProductImage[]
  createdAt: number
  updatedAt: number
}

interface DataContextType {
  categories: Category[]
  products: Product[]
  addCategory: (name: string) => void
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void
  deleteCategory: (id: number) => void
  deleteProduct: (id: number) => void
  uploadImage: (file: File) => Promise<string>
  editCategory: (id: number, newName: string) => void
  editProduct: (id: number, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => void
  addProductImage: (productId: number, imageUrl: string, isMain?: boolean) => void
  removeProductImage: (productId: number, imageId: number) => void
  setMainProductImage: (productId: number, imageId: number) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='

export function DataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Material Testing Machines' },
    { id: 2, name: 'Calibration Equipment' },
    { id: 3, name: 'Measurement Tools' },
    { id: 4, name: 'Quality Control Systems' },
    { id: 5, name: 'Industrial Testing Equipment' }
  ])
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Universal Testing Machine (UTM)',
      description: 'High-precision material testing machine for tensile, compression, and flexural testing',
      categoryId: 1,
      price: 850000,
      stock: 5,
      sku: 'UTM-1000',
      specifications: {
        'Capacity': '1000 kN',
        'Accuracy': '±0.5%',
        'Test Speed': '0.001-500 mm/min'
      },
      features: [
        'Digital control system',
        'Multiple test modes',
        'Data acquisition software',
        'Safety interlocks'
      ],
      images: [{ id: 1, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 2,
      name: 'Hardness Tester',
      description: 'Digital hardness testing machine with multiple scales (Rockwell, Brinell, Vickers)',
      categoryId: 1,
      price: 450000,
      stock: 8,
      sku: 'HT-2000',
      specifications: {
        'Scales': 'Rockwell, Brinell, Vickers',
        'Load Range': '1-3000 kgf',
        'Resolution': '0.1 HRC'
      },
      features: [
        'Touch screen interface',
        'Automatic test cycle',
        'Built-in printer',
        'Data export capability'
      ],
      images: [{ id: 2, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 3,
      name: 'Impact Testing Machine',
      description: 'Charpy and Izod impact testing machine for material toughness evaluation',
      categoryId: 1,
      price: 650000,
      stock: 4,
      sku: 'ITM-300',
      specifications: {
        'Energy Range': '0-300 J',
        'Pendulum Type': 'Charpy/Izod',
        'Strike Velocity': '5.2 m/s'
      },
      features: [
        'Dual scale system',
        'Automatic energy calculation',
        'Safety enclosure',
        'Calibration certificate'
      ],
      images: [{ id: 3, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 4,
      name: 'Pressure Calibrator',
      description: 'High-accuracy pressure calibration system for industrial applications',
      categoryId: 2,
      price: 350000,
      stock: 6,
      sku: 'PC-5000',
      specifications: {
        'Range': '0-5000 psi',
        'Accuracy': '±0.05%',
        'Resolution': '0.01 psi'
      },
      features: [
        'Digital display',
        'Multiple pressure units',
        'Data logging',
        'Battery powered'
      ],
      images: [{ id: 4, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 5,
      name: 'Temperature Calibrator',
      description: 'Precision temperature calibration system with multiple sensor support',
      categoryId: 2,
      price: 280000,
      stock: 7,
      sku: 'TC-200',
      specifications: {
        'Range': '-40°C to 1200°C',
        'Accuracy': '±0.1°C',
        'Channels': '4'
      },
      features: [
        'Multi-sensor support',
        'Calibration software',
        'Documentation system',
        'Portable design'
      ],
      images: [{ id: 5, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 6,
      name: 'Digital Micrometer',
      description: 'High-precision digital micrometer for accurate measurements',
      categoryId: 3,
      price: 15000,
      stock: 20,
      sku: 'DM-100',
      specifications: {
        'Range': '0-25mm',
        'Resolution': '0.001mm',
        'Accuracy': '±0.002mm'
      },
      features: [
        'Digital display',
        'Zero setting',
        'Data output',
        'IP54 protection'
      ],
      images: [{ id: 6, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 7,
      name: 'Surface Roughness Tester',
      description: 'Portable surface roughness measurement system',
      categoryId: 3,
      price: 450000,
      stock: 4,
      sku: 'SRT-200',
      specifications: {
        'Range': '0.05-10.0 µm',
        'Parameters': 'Ra, Rz, Rq, Rt',
        'Speed': '0.5 mm/s'
      },
      features: [
        'Touch screen',
        'Multiple parameters',
        'Data storage',
        'Battery operation'
      ],
      images: [{ id: 7, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 8,
      name: 'Coordinate Measuring Machine (CMM)',
      description: 'High-precision 3D measurement system for complex geometries',
      categoryId: 3,
      price: 2500000,
      stock: 2,
      sku: 'CMM-500',
      specifications: {
        'Measuring Volume': '500x500x500mm',
        'Accuracy': '±0.002mm',
        'Probe Type': 'Touch trigger'
      },
      features: [
        'CNC operation',
        'CAD interface',
        'Automated measurement',
        'Temperature compensation'
      ],
      images: [{ id: 8, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 9,
      name: 'Spectrometer',
      description: 'Optical emission spectrometer for material analysis',
      categoryId: 4,
      price: 1800000,
      stock: 3,
      sku: 'SPEC-1000',
      specifications: {
        'Elements': '20+ elements',
        'Detection Limits': 'ppm level',
        'Analysis Time': '<30 seconds'
      },
      features: [
        'Multi-element analysis',
        'Automated operation',
        'Database system',
        'Remote control'
      ],
      images: [{ id: 9, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 10,
      name: 'X-Ray Fluorescence Analyzer',
      description: 'Non-destructive elemental analysis system',
      categoryId: 4,
      price: 2200000,
      stock: 2,
      sku: 'XRF-2000',
      specifications: {
        'Elements': 'Na to U',
        'Detection Limits': 'ppm level',
        'Analysis Time': '<60 seconds'
      },
      features: [
        'No sample preparation',
        'Large sample chamber',
        'Safety interlocks',
        'Analysis software'
      ],
      images: [{ id: 10, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 11,
      name: 'Vibration Analyzer',
      description: 'Portable vibration measurement and analysis system',
      categoryId: 5,
      price: 350000,
      stock: 6,
      sku: 'VA-300',
      specifications: {
        'Frequency Range': '0.1-20kHz',
        'Channels': '2',
        'Resolution': '3200 lines'
      },
      features: [
        'FFT analysis',
        'Time waveform',
        'Data recording',
        'Battery powered'
      ],
      images: [{ id: 11, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 12,
      name: 'Ultrasonic Thickness Gauge',
      description: 'Digital ultrasonic thickness measurement device',
      categoryId: 5,
      price: 85000,
      stock: 15,
      sku: 'UTG-100',
      specifications: {
        'Range': '0.8-300mm',
        'Accuracy': '±0.1mm',
        'Materials': 'Steel, Aluminum, Plastic'
      },
      features: [
        'Digital display',
        'Data storage',
        'Battery operation',
        'Multiple materials'
      ],
      images: [{ id: 12, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 13,
      name: 'Tensile Testing Machine',
      description: 'Computer-controlled tensile testing system',
      categoryId: 1,
      price: 950000,
      stock: 3,
      sku: 'TTM-2000',
      specifications: {
        'Capacity': '2000 kN',
        'Accuracy': '±0.5%',
        'Test Speed': '0.001-500 mm/min'
      },
      features: [
        'PC control',
        'Multiple test modes',
        'Data analysis',
        'Safety features'
      ],
      images: [{ id: 13, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 14,
      name: 'Torque Calibrator',
      description: 'High-precision torque calibration system',
      categoryId: 2,
      price: 420000,
      stock: 4,
      sku: 'TC-1000',
      specifications: {
        'Range': '0-1000 Nm',
        'Accuracy': '±0.1%',
        'Resolution': '0.01 Nm'
      },
      features: [
        'Digital display',
        'Data logging',
        'Multiple units',
        'Calibration certificate'
      ],
      images: [{ id: 14, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 15,
      name: 'Digital Height Gauge',
      description: 'Precision height measurement system',
      categoryId: 3,
      price: 75000,
      stock: 10,
      sku: 'DHG-500',
      specifications: {
        'Range': '0-500mm',
        'Resolution': '0.001mm',
        'Accuracy': '±0.003mm'
      },
      features: [
        'Digital display',
        'Data output',
        'Surface plate',
        'Hard case'
      ],
      images: [{ id: 15, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 16,
      name: 'Leak Testing System',
      description: 'Automated leak detection system',
      categoryId: 4,
      price: 850000,
      stock: 3,
      sku: 'LTS-100',
      specifications: {
        'Sensitivity': '1x10-6 mbar·l/s',
        'Test Volume': '0.1-1000 l',
        'Cycle Time': '<30 seconds'
      },
      features: [
        'Automated testing',
        'Data logging',
        'Multiple test modes',
        'Safety features'
      ],
      images: [{ id: 16, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 17,
      name: 'Thermal Imaging Camera',
      description: 'High-resolution thermal imaging system',
      categoryId: 5,
      price: 450000,
      stock: 5,
      sku: 'TIC-200',
      specifications: {
        'Resolution': '320x240',
        'Temperature Range': '-20°C to 650°C',
        'Accuracy': '±2°C'
      },
      features: [
        'Color display',
        'Image storage',
        'Analysis software',
        'Battery powered'
      ],
      images: [{ id: 17, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 18,
      name: 'Spring Testing Machine',
      description: 'Computer-controlled spring testing system',
      categoryId: 1,
      price: 550000,
      stock: 4,
      sku: 'STM-500',
      specifications: {
        'Load Capacity': '5000 N',
        'Stroke': '200 mm',
        'Speed': '0.1-500 mm/min'
      },
      features: [
        'PC control',
        'Multiple test modes',
        'Data analysis',
        'Safety features'
      ],
      images: [{ id: 18, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 19,
      name: 'Digital Caliper',
      description: 'High-precision digital caliper',
      categoryId: 3,
      price: 12000,
      stock: 25,
      sku: 'DC-150',
      specifications: {
        'Range': '0-150mm',
        'Resolution': '0.01mm',
        'Accuracy': '±0.02mm'
      },
      features: [
        'Digital display',
        'Zero setting',
        'Data output',
        'IP54 protection'
      ],
      images: [{ id: 19, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 20,
      name: 'Non-Destructive Testing Kit',
      description: 'Complete NDT testing kit with multiple methods',
      categoryId: 5,
      price: 750000,
      stock: 3,
      sku: 'NDT-100',
      specifications: {
        'Methods': 'UT, PT, MT, RT',
        'Components': '10+',
        'Case': 'Hard transport case'
      },
      features: [
        'Multiple methods',
        'Complete kit',
        'Training manual',
        'Calibration tools'
      ],
      images: [{ id: 20, url: '/images/placeholder.jpg', isMain: true }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  ])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load data from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCategories = localStorage.getItem('categories')
        const savedProducts = localStorage.getItem('products')
        
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories))
        }
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts))
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
      }
      setIsInitialized(true)
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem('categories', JSON.stringify(categories))
        localStorage.setItem('products', JSON.stringify(products))
      } catch (error) {
        console.error('Error saving data to localStorage:', error)
      }
    }
  }, [categories, products, isInitialized])

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        resolve(base64String)
      }
      reader.onerror = () => {
        console.error('Error reading file')
        resolve(DEFAULT_PLACEHOLDER)
      }
      reader.readAsDataURL(file)
    })
  }

  const addCategory = (name: string) => {
    const newCategory = { id: Date.now(), name }
    setCategories(prev => [...prev, newCategory])
  }

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now()
    const newProduct = {
      ...product,
      id: now,
      createdAt: now,
      updatedAt: now,
      images: product.images || [{ id: now, url: DEFAULT_PLACEHOLDER, isMain: true }]
    }
    setProducts(prev => [...prev, newProduct])
  }

  const deleteCategory = (id: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
    // Also delete associated products
    setProducts(prev => prev.filter(prod => prod.categoryId !== id))
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(prod => prod.id !== id))
  }

  const editCategory = (id: number, newName: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, name: newName } : cat
    ))
  }

  const editProduct = (id: number, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setProducts(prev => prev.map(prod => 
      prod.id === id ? { ...prod, ...updates, updatedAt: Date.now() } : prod
    ))
  }

  const addProductImage = (productId: number, imageUrl: string, isMain: boolean = false) => {
    setProducts(prev => prev.map(prod => {
      if (prod.id === productId) {
        const newImage = { id: Date.now(), url: imageUrl, isMain }
        const updatedImages = isMain
          ? prod.images.map(img => ({ ...img, isMain: false })).concat(newImage)
          : prod.images.concat(newImage)
        return { ...prod, images: updatedImages, updatedAt: Date.now() }
      }
      return prod
    }))
  }

  const removeProductImage = (productId: number, imageId: number) => {
    setProducts(prev => prev.map(prod => {
      if (prod.id === productId) {
        const updatedImages = prod.images.filter(img => img.id !== imageId)
        // If we removed the main image and there are other images, make the first one main
        if (updatedImages.length > 0 && !updatedImages.some(img => img.isMain)) {
          updatedImages[0].isMain = true
        }
        return { ...prod, images: updatedImages, updatedAt: Date.now() }
      }
      return prod
    }))
  }

  const setMainProductImage = (productId: number, imageId: number) => {
    setProducts(prev => prev.map(prod => {
      if (prod.id === productId) {
        const updatedImages = prod.images.map(img => ({
          ...img,
          isMain: img.id === imageId
        }))
        return { ...prod, images: updatedImages, updatedAt: Date.now() }
      }
      return prod
    }))
  }

  const value = {
    categories,
    products,
    addCategory,
    addProduct,
    deleteCategory,
    deleteProduct,
    uploadImage,
    editCategory,
    editProduct,
    addProductImage,
    removeProductImage,
    setMainProductImage,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
} 