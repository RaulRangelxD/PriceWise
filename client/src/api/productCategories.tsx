import { ProductCategoryData } from '@/lib/types'
import axios from 'axios'

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/productcategories`

export const getAllProductCategories = async (): Promise<ProductCategoryData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductCategoriesByUserId = async (userId: string): Promise<ProductCategoryData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/${userId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductCategoriesByProductId = async (productId: string): Promise<ProductCategoryData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/productid/${productId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductCategoriesByCategoryId = async (categoryId: string): Promise<ProductCategoryData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/categoryid/${categoryId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getProductCategoryById = async (id: number): Promise<ProductCategoryData> => {
  try {
    const result = await axios.get(`${BASE_URL}/id/${id}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const postProductCategory = async (productId: string, categoryId: string): Promise<void> => {
  try {
    console.log(productId, categoryId)
    await axios.post(`${BASE_URL}`, { productId, categoryId }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const deleteProductCategory = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/id/${id}`, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const deleteProductCategoryByProductIdAndCategoryId = async (productId: string, categoryId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/productidandcategoryid/`, { params: { productId, categoryId }, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
