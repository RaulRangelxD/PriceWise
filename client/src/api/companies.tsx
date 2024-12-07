import { CompanyData } from '@/lib/types'
import axios from 'axios'

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/companies`

export const getAllCompanies = async (): Promise<CompanyData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllCompaniesByUserId = async (userId: string): Promise<CompanyData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/${userId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllCompaniesByUserIdAndPagination = async (userId: string, limit: number, offset: number): Promise<CompanyData[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/userid/pag/${userId}`, { params: { limit, offset }, headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getCompanyById = async (id: number): Promise<CompanyData> => {
  try {
    const result = await axios.get(`${BASE_URL}/id/${id}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const postCompany = async (userId: string, name: string, rif: string, phone: string, address: string): Promise<void> => {
  try {
    console.log(userId, name, rif, phone, address)
    await axios.post(`${BASE_URL}`, { userId, name, rif, phone, address }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const patchCompany = async (name: string, rif: string, phone: string, address: string, id: number): Promise<void> => {
  try {
    await axios.patch(`${BASE_URL}/id/${id}`, { name, rif, phone, address }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const deleteCompany = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/id/${id}`, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
