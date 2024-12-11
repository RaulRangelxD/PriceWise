import { CategoryData } from '@/lib/types'
import axios from 'axios'

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/categories`

export const getAllCategories = async (): Promise<CategoryData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllCategoriesByUserId = async (userId: string): Promise<CategoryData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/${userId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllCategoriesByUserIdAndPagination = async (userId: string, limit: number, offset: number): Promise<CategoryData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/pag/${userId}`, { params: { limit, offset }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getCategoryById = async (id: number): Promise<CategoryData> => {
  try {
    const result = await axios.get(`${BASE_URL}/id/${id}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const postCategory = async (userId: string, name: string): Promise<void> => {
  try {
    console.log(userId, name)
    await axios.post(`${BASE_URL}`, { userId, name }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const patchCategory = async (name: string, id: number): Promise<void> => {
  try {
    await axios.patch(`${BASE_URL}/id/${id}`, { name }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/id/${id}`, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
