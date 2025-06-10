import { Category } from '@/types'

let categories: Category[] = []

export async function addCategory(name: string): Promise<void> {
  categories.push({ id: Date.now(), name, products: [] })
}

export async function updateCategory(id: number, name: string): Promise<void> {
  categories = categories.map(cat =>
    cat.id === id ? { ...cat, name } : cat
  )
}

export async function deleteCategory(id: number): Promise<void> {
  categories = categories.filter(cat => cat.id !== id)
}

export async function getCategories(): Promise<Category[]> {
  return categories
} 