import { FactureProductData } from '@/lib/types'
import axios from 'axios'

const FACTURE_PRODUCTS_BASE_URL = `${process.env.NEXT_PUBLIC_API}/factureproducts`

export const getAllFactureProducts = async () => {
  try {
    const result = await axios.get(`${FACTURE_PRODUCTS_BASE_URL}`, {
      headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getFactureProductsByFactureId = async (factureId: number) => {
  try {
    const result = await axios.get(`${FACTURE_PRODUCTS_BASE_URL}/factureid/${factureId}`, {
      headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllFactureProductsByFactureIdAndPagination = async (factureId: string, limit: number, offset: number): Promise<FactureProductData[]> => {
  try {
    const result = await axios.get(`${FACTURE_PRODUCTS_BASE_URL}/factureid/pag/${factureId}`, { params: { limit, offset }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getFactureProductsByProductId = async (productId: number) => {
  try {
    const result = await axios.get(`${FACTURE_PRODUCTS_BASE_URL}/productid/${productId}`, {
      headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const postFactureProduct = async (factureId: number, productId: number, quantity: number, totalPrice: number) => {
  try {
    const result = await axios.post(`${FACTURE_PRODUCTS_BASE_URL}`, { factureId, productId, quantity, totalPrice }, { headers: { 'Content-Type': 'application/json' } })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const deleteFactureProduct = async (id: number) => {
  try {
    await axios.delete(`${FACTURE_PRODUCTS_BASE_URL}/id/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
