import axios from 'axios'
import { DataToken } from '@/lib/types'

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/otps`

export const sendOtps = async (email: string, purpose: string): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/send`, { email, purpose }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const verifyOtps = async (email: string, otp: string, purpose: string): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/verify`, { email, otp, purpose }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const authCheck = async (): Promise<DataToken | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/authtoken`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true })
    return response.data.data
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'An unexpected error occurred')
    return false
  }
}
