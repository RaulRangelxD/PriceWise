import { ProductPriceData } from '@/lib/types'
import axios from 'axios'

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/productprices`

export const getAllProductCategories = async (): Promise<ProductPriceData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductCategoriesByUserId = async (userId: string): Promise<ProductPriceData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/${userId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductCategoriesByProductId = async (productId: string): Promise<ProductPriceData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/productid/${productId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getProductPriceById = async (id: number): Promise<ProductPriceData> => {
  try {
    const result = await axios.get(`${BASE_URL}/id/${id}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductPricesByProductIdAndPagination = async (productId: string, limit: number, offset: number): Promise<ProductPriceData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/productid/pag/${productId}`, { params: { limit, offset }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const postProductPrice = async (productId: string, price: string): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}`, { productId, price }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const deleteProductPrice = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/id/${id}`, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
