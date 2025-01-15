import {
  getAllFacturesModel,
  getFactureByIdModel,
  getFacturesByUserIdModel,
  getAllFacturesByUserIdAndPaginationModel,
  getAllFacturesByCompanyIdModel,
  getAllFacturesByCompanyIdAndPaginationModel,
  getFacturesByDateRangeModel,
  getFacturesByDateRangeAndCompanyIdModel,
  postFactureModel,
  patchFactureTotalAmountModel,
  deleteFactureModel,
} from '../models/factures.js'
import { defaultResponse } from '../utils/defaultRes.js'
import { Request, Response } from 'express'

export const getAllFactures = async (req: Request, res: Response) => {
  try {
    const result = await getAllFacturesModel()
    defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving factures from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving factures' })
  }
}

export const getFactureById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  try {
    const result = await getFactureByIdModel(id)
    defaultResponse({ res, status: 200, message: 'Facture retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving facture by ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving facture' })
  }
}

export const getFacturesByUserId = async (req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params
  try {
    const result = await getFacturesByUserIdModel(userId)
    defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving factures by user ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving factures' })
  }
}

export const getAllFacturesByUserIdAndPagination = async (req: Request, res: Response) => {
  const { userid } = req.params

  const limit = parseInt(req.query.limit as string, 10)
  const offset = parseInt(req.query.offset as string, 10)

  if (!userid || typeof limit !== 'number' || typeof offset !== 'number') {
    defaultResponse({ res, status: 400, message: 'Missing query fields or type error' })
    return
  }

  const pagination = limit * offset

  try {
    const result = await getAllFacturesByUserIdAndPaginationModel(userid, limit, pagination)
    defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving Factures from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Factures' })
  }
}

export const getAllFacturesByCompanyId = async (req: Request<{ companyId: string }>, res: Response) => {
  const { companyId } = req.params
  try {
    const result = await getAllFacturesByCompanyIdModel(companyId)
    defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving factures by company ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving factures' })
  }
}

export const getAllFacturesByCompanyIdAndPagination = async (req: Request<{ companyid: string }>, res: Response) => {
  const { companyid } = req.params

  const limit = parseInt(req.query.limit as string, 10)
  const offset = parseInt(req.query.offset as string, 10)

  console.log(companyid, offset, limit)

  if (!companyid || typeof limit !== 'number' || typeof offset !== 'number') {
    defaultResponse({ res, status: 400, message: 'Missing query fields or type error' })
    return
  }

  try {
    const result = await getAllFacturesByCompanyIdAndPaginationModel(companyid, Number(limit), Number(offset))
    defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving factures by company ID with pagination from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving factures' })
  }
}

export const getFacturesByDateRange = async (req: Request, res: Response) => {
  const { userId, startDate, endDate } = req.query

  if (!userId || !startDate || !endDate) {
    defaultResponse({ res, status: 400, message: 'Missing required query parameters' })
    return
  }

  try {
    const result = await getFacturesByDateRangeModel(String(userId), String(startDate), String(endDate))
    defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows })
  } catch (error) {
    console.error('Error retrieving factures by date range:', error)
    defaultResponse({ res, status: 500, message: 'Error retrieving factures' })
  }
}

export const getFacturesByDateRangeAndCompanyId = async (req: Request, res: Response) => {
  const { companyId, startDate, endDate } = req.query

  if (!companyId || !startDate || !endDate) {
    defaultResponse({ res, status: 400, message: 'Missing required query parameters' })
    return
  }

  try {
    const result = await getFacturesByDateRangeAndCompanyIdModel(String(companyId), String(startDate), String(endDate))
    defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows })
  } catch (error) {
    console.error('Error retrieving factures by date range:', error)
    defaultResponse({ res, status: 500, message: 'Error retrieving factures' })
  }
}

export const postFacture = async (req: Request, res: Response) => {
  const { userId, companyId, totalAmount, date } = req.body
  console.log(userId, companyId, totalAmount, date)

  if (!userId || totalAmount === undefined || !companyId || !date) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  try {
    const facture = await postFactureModel(userId, companyId, totalAmount, date)

    defaultResponse({ res, status: 201, message: 'Facture created successfully', data: facture })
  } catch (e) {
    console.log('Error creating facture in database', e)
    defaultResponse({ res, status: 500, message: 'Error creating facture' })
  }
}

export const patchFactureTotalAmount = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const { totalAmount } = req.body

  if (totalAmount === undefined) {
    defaultResponse({ res, status: 400, message: 'Missing totalAmount field' })
    return
  }

  try {
    await patchFactureTotalAmountModel(id, totalAmount)
    defaultResponse({ res, status: 200, message: 'Facture total amount updated successfully' })
  } catch (e) {
    console.log('Error updating facture total amount in database', e)
    defaultResponse({ res, status: 500, message: 'Error updating facture total amount' })
  }
}

export const deleteFacture = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    await deleteFactureModel(id)
    defaultResponse({ res, status: 200, message: 'Facture deleted successfully' })
  } catch (e) {
    console.log('Error deleting facture from database', e)
    defaultResponse({ res, status: 500, message: 'Error deleting facture' })
  }
}
