import { Category, Product } from '@/types'

/**
 * Initial categories for the application
 * These are used when no categories exist in localStorage
 */
export const initialCategories: Category[] = [
  { id: 1, name: 'Testing Machines' },
  { id: 2, name: 'Calibrators' },
  { id: 3, name: 'Measurement Tools' },
]

/**
 * Initial products for the application
 * These are used when no products exist in localStorage
 */
export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Universal Testing Machine',
    description: 'High-precision material testing machine for tensile, compression, and flexural testing.',
    categoryId: 1,
    price: 850000,
    stock: 5,
    sku: 'UTM-1000',
    specifications: {
      Capacity: '1000 kN',
      Accuracy: '±0.5%',
      'Test Speed': '0.001-500 mm/min',
    },
    features: [
      'Digital control system',
      'Multiple test modes',
      'Data acquisition software',
      'Safety interlocks',
    ],
    images: [
      { id: 1, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 2,
    name: 'Pressure Calibrator',
    description: 'High-accuracy pressure calibration system for industrial applications.',
    categoryId: 2,
    price: 350000,
    stock: 6,
    sku: 'PC-5000',
    specifications: {
      Range: '0-5000 psi',
      Accuracy: '±0.05%',
      Resolution: '0.01 psi',
    },
    features: [
      'Digital display',
      'Multiple pressure units',
      'Data logging',
      'Battery powered',
    ],
    images: [
      { id: 2, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 3,
    name: 'Digital Micrometer',
    description: 'High-precision digital micrometer for accurate measurements.',
    categoryId: 3,
    price: 15000,
    stock: 20,
    sku: 'DM-100',
    specifications: {
      Range: '0-25mm',
      Resolution: '0.001mm',
      Accuracy: '±0.002mm',
    },
    features: [
      'Digital display',
      'Zero setting',
      'Data output',
      'IP54 protection',
    ],
    images: [
      { id: 3, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 4,
    name: 'Hardness Tester',
    description: 'Digital hardness testing machine with multiple scales (Rockwell, Brinell, Vickers).',
    categoryId: 1,
    price: 450000,
    stock: 8,
    sku: 'HT-2000',
    specifications: {
      Scales: 'Rockwell, Brinell, Vickers',
      'Load Range': '1-3000 kgf',
      Resolution: '0.1 HRC',
    },
    features: [
      'Touch screen interface',
      'Automatic test cycle',
      'Built-in printer',
      'Data export capability',
    ],
    images: [
      { id: 4, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 5,
    name: 'Surface Roughness Tester',
    description: 'Portable surface roughness measurement system.',
    categoryId: 3,
    price: 450000,
    stock: 4,
    sku: 'SRT-200',
    specifications: {
      Range: '0.05-10.0 µm',
      Parameters: 'Ra, Rz, Rq, Rt',
      Speed: '0.5 mm/s',
    },
    features: [
      'Touch screen',
      'Multiple parameters',
      'Data storage',
      'Battery operation',
    ],
    images: [
      { id: 5, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 6,
    name: 'Temperature Calibrator',
    description: 'Precision temperature calibration system with multiple sensor support.',
    categoryId: 2,
    price: 280000,
    stock: 7,
    sku: 'TC-200',
    specifications: {
      Range: '-40°C to 1200°C',
      Accuracy: '±0.1°C',
      Channels: '4',
    },
    features: [
      'Multi-sensor support',
      'Calibration software',
      'Documentation system',
      'Portable design',
    ],
    images: [
      { id: 6, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 7,
    name: 'Coordinate Measuring Machine',
    description: 'High-precision 3D measurement system for complex geometries.',
    categoryId: 3,
    price: 2500000,
    stock: 2,
    sku: 'CMM-500',
    specifications: {
      'Measuring Volume': '500x500x500mm',
      Accuracy: '±0.002mm',
      'Probe Type': 'Touch trigger',
    },
    features: [
      'CNC operation',
      'CAD interface',
      'Automated measurement',
      'Temperature compensation',
    ],
    images: [
      { id: 7, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 8,
    name: 'Spectrometer',
    description: 'Optical emission spectrometer for material analysis.',
    categoryId: 1,
    price: 1800000,
    stock: 3,
    sku: 'SPEC-1000',
    specifications: {
      Elements: '20+ elements',
      'Detection Limits': 'ppm level',
      'Analysis Time': '<30 seconds',
    },
    features: [
      'Multi-element analysis',
      'Automated operation',
      'Database system',
      'Remote control',
    ],
    images: [
      { id: 8, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 9,
    name: 'Vibration Analyzer',
    description: 'Portable vibration measurement and analysis system.',
    categoryId: 2,
    price: 350000,
    stock: 6,
    sku: 'VA-300',
    specifications: {
      'Frequency Range': '0.1-20kHz',
      Channels: '2',
      Resolution: '3200 lines',
    },
    features: [
      'FFT analysis',
      'Time waveform',
      'Data recording',
      'Battery powered',
    ],
    images: [
      { id: 9, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 10,
    name: 'Digital Caliper',
    description: 'High-precision digital caliper.',
    categoryId: 3,
    price: 12000,
    stock: 25,
    sku: 'DC-150',
    specifications: {
      Range: '0-150mm',
      Resolution: '0.01mm',
      Accuracy: '±0.02mm',
    },
    features: [
      'Digital display',
      'Zero setting',
      'Data output',
      'IP54 protection',
    ],
    images: [
      { id: 10, url: '/images/placeholder.jpg', isMain: true },
    ],
    isPublished: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]

const placeholderImageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==' 