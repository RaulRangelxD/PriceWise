import { ProductData } from '@/lib/types'
import axios from 'axios'

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/products`

export const getAllProducts = async (): Promise<ProductData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductsByUserId = async (userId: string): Promise<ProductData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/${userId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductsByUserIdAndPagination = async (userId: string, limit: number, offset: number): Promise<ProductData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/pag/${userId}`, { params: { limit, offset }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllProductsByCompanyIdAndPagination = async (companyId: number, limit: number, offset: number): Promise<ProductData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/companyid/pag/${companyId}`, { params: { limit, offset }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getProductById = async (id: number): Promise<ProductData> => {
  try {
    const result = await axios.get(`${BASE_URL}/id/${id}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const postProduct = async (companyId: number, userId: string, name: string, description: string, price: number, weight: number, weightUnit: string, quantity: number): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}`, { companyId, userId, name, description, price, weight, weightUnit, quantity }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const patchProduct = async (name: string, description: string, weight: number, weightUnit: string, quantity: number, id: number): Promise<void> => {
  try {
    await axios.patch(`${BASE_URL}/id/${id}`, { name, description, weight, weightUnit, quantity }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/id/${id}`, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
