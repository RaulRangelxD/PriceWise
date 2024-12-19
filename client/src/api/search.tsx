import axios from 'axios'
import { ProductData, CategoryData, CompanyData } from '@/lib/types'

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/search`

export const searchInCompanies = async (userId: string, keyword: string): Promise<CompanyData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/companies/userid/${userId}`, { params: { keyword }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const searchInProducts = async (userId: string, keyword: string): Promise<ProductData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/products/userid/${userId}`, { params: { keyword }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const searchInCategories = async (userId: string, keyword: string): Promise<CategoryData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/categories/userid/${userId}`, { params: { keyword }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
