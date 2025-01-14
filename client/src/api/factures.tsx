import axios from 'axios'

const FACTURES_BASE_URL = `${process.env.NEXT_PUBLIC_API}/factures`

export const getAllFactures = async () => {
  try {
    const result = await axios.get(`${FACTURES_BASE_URL}`, {
      headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getFacturesByUserId = async (userId: string) => {
  try {
    const result = await axios.get(`${FACTURES_BASE_URL}/userid/${userId}`, {
      headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllFacturesByCompanyId = async (companyId: number) => {
  try {
    const result = await axios.get(`${FACTURES_BASE_URL}/companyid/${companyId}`, {
      headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getAllFacturesByCompanyIdAndPagination = async (companyId: number, limit: number, offset: number) => {
  try {
    const result = await axios.get(`${FACTURES_BASE_URL}/companyid/pag/${String(companyId)}`, {
      params: { limit, offset },
      headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const getFactureById = async (id: number) => {
  try {
    const result = await axios.get(`${FACTURES_BASE_URL}/id/${id}`, {
      headers: { 'Cache-Control': 'no-store' },
      withCredentials: true,
    })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const postFacture = async (userId: string, companyId: number, totalAmount: string, date: string) => {
  try {
    const result = await axios.post(`${FACTURES_BASE_URL}`, { userId, companyId, totalAmount, date }, { headers: { 'Content-Type': 'application/json' } })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const patchFactureTotalAmount = async (id: number, totalAmount: number) => {
  try {
    const result = await axios.patch(`${FACTURES_BASE_URL}/id/${id}/totalAmount`, { totalAmount }, { headers: { 'Content-Type': 'application/json' } })
    return result.data.data
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}

export const deleteFacture = async (id: number) => {
  try {
    await axios.delete(`${FACTURES_BASE_URL}/id/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    throw error
  }
}
