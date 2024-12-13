import {
  getAllProductPricesModel,
  getAllProductPricesByUserIdModel,
  getProductPriceByIdModel,
  getProductPriceByProductIdModel,
  getAllProductPricesByProductIdAndPaginationModel,
  postProductPriceModel,
  deleteProductPriceModel,
} from '../models/productPrices.js'
import { defaultResponse } from '../utils/defaultRes.js'
import { Request, Response } from 'express'

export const getAllProductPrices = async (req: Request, res: Response) => {
  try {
    const result = await getAllProductPricesModel()
    defaultResponse({ res, status: 200, message: 'ProductPrices retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving ProductPrices from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductPrices' })
  }
}

export const getAllProductPricesByUserId = async (req: Request, res: Response) => {
  const { userid } = req.params

  try {
    const result = await getAllProductPricesByUserIdModel(userid)
    defaultResponse({ res, status: 200, message: 'ProductPrices retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving ProductPrices from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductPrices' })
  }
}

export const getProductPriceById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  try {
    const result = await getProductPriceByIdModel(id)
    defaultResponse({ res, status: 200, message: 'ProductPrice retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving ProductPrice by ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductPrice' })
  }
}

export const getProductPriceByProductId = async (req: Request<{ productid: string }>, res: Response) => {
  const { productid } = req.params
  try {
    const result = await getProductPriceByProductIdModel(productid)
    defaultResponse({ res, status: 200, message: 'ProductPrice retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving ProductPrice by ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductPrice' })
  }
}

export const getAllProductPricesByProductIdAndPagination = async (req: Request, res: Response) => {
  const { productid } = req.params

  const limit = parseInt(req.query.limit as string, 10)
  const offset = parseInt(req.query.offset as string, 10)

  if (!productid || typeof limit !== 'number' || typeof offset !== 'number') {
    defaultResponse({ res, status: 400, message: 'Missing query fields or type error' })
    return
  }

  const pagination = limit * offset

  try {
    const result = await getAllProductPricesByProductIdAndPaginationModel(productid, limit, pagination)
    defaultResponse({ res, status: 200, message: 'ProductPrices retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving ProductPrices from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductPrices' })
  }
}

export const postProductPrice = async (req: Request, res: Response) => {
  const { productId, price } = req.body

  if (!productId || !price) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  try {
    await postProductPriceModel(productId, price)
    defaultResponse({ res, status: 201, message: 'ProductPrice create successfully' })
  } catch (e) {
    console.log('Error creating ProductPrice in database', e)
    defaultResponse({ res, status: 500, message: 'Error creating ProductPrice' })
  }
}

export const deleteProductPrice = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    await deleteProductPriceModel(id)
    defaultResponse({ res, status: 200, message: 'ProductPrice deleted successfully' })
  } catch (e) {
    console.log('Error deleting ProductPrice in database', e)
    defaultResponse({ res, status: 500, message: 'Error deleting ProductPrice' })
  }
}
