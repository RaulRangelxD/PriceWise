import axios from 'axios'
import { ProductData, CategoryData, CompanyData } from '@/lib/types'

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/search`

export const searchInTable = async (userId: string, table: string, keyword: string): Promise<ProductData[] | CategoryData[] | CompanyData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/${userId}`, { params: { table, keyword }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
