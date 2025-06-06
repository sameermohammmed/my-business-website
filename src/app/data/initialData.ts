const placeholderImageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Y2EzYWYiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='

export const initialCategories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' },
  { id: 4, name: 'Home & Kitchen' },
  { id: 5, name: 'Sports' }
]

export const initialProducts = [
  {
    id: 1,
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features',
    categoryId: 1,
    price: 699.99,
    stock: 50,
    sku: 'SPX-001',
    specifications: {
      'Screen': '6.5 inch OLED',
      'RAM': '8GB',
      'Storage': '128GB',
      'Battery': '4500mAh'
    },
    features: [
      '5G Connectivity',
      'Water Resistant',
      'Fast Charging',
      'Face Recognition'
    ],
    images: [
      { id: 1, url: '/images/placeholder.jpg', isMain: true }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 2,
    name: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains',
    categoryId: 5,
    price: 89.99,
    stock: 100,
    sku: 'RS-001',
    specifications: {
      'Material': 'Mesh',
      'Sole': 'Rubber',
      'Closure': 'Lace-up',
      'Weight': '250g'
    },
    features: [
      'Breathable',
      'Cushioned',
      'Lightweight',
      'Durable'
    ],
    images: [
      { id: 1, url: '/images/placeholder.jpg', isMain: true }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 3,
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    categoryId: 4,
    price: 49.99,
    stock: 30,
    sku: 'CM-001',
    specifications: {
      'Capacity': '12 cups',
      'Material': 'Stainless Steel',
      'Power': '1000W',
      'Timer': '24-hour'
    },
    features: [
      'Programmable',
      'Auto Shut-off',
      'Thermal Carafe',
      'Easy Clean'
    ],
    images: [
      { id: 1, url: '/images/placeholder.jpg', isMain: true }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 4,
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
    images: [{ id: 1, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 5,
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
    images: [{ id: 2, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 6,
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
    images: [{ id: 3, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 7,
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
    images: [{ id: 4, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 8,
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
    images: [{ id: 5, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 9,
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
    images: [{ id: 6, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 10,
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
    images: [{ id: 7, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 11,
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
    images: [{ id: 8, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 12,
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
    images: [{ id: 9, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 13,
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
    images: [{ id: 10, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 14,
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
    images: [{ id: 11, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 15,
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
    images: [{ id: 12, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 16,
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
    images: [{ id: 13, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 17,
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
    images: [{ id: 14, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 18,
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
    images: [{ id: 15, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 19,
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
    images: [{ id: 16, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 20,
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
    images: [{ id: 17, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 21,
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
    images: [{ id: 18, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 22,
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
    images: [{ id: 19, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 23,
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
    images: [{ id: 20, url: placeholderImageUrl, isMain: true }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
] 