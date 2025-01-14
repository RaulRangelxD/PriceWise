import {
  getAllProductsModel,
  getAllProductsByUserIdModel,
  getAllProductsByUserIdAndPaginationModel,
  getAllProductsByCompanyIdModel,
  getAllProductsByCompanyIdAndPaginationModel,
  getAllProductsByCategoryIdAndPaginationModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  deleteProductModel,
} from '../models/products.js'
import { defaultResponse } from '../utils/defaultRes.js'
import { Request, Response } from 'express'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await getAllProductsModel()
    defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving Products from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Products' })
  }
}

export const getAllProductsByUserId = async (req: Request, res: Response) => {
  const { userid } = req.params

  try {
    const result = await getAllProductsByUserIdModel(userid)
    defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving Products from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Products' })
  }
}

export const getAllProductsByUserIdAndPagination = async (req: Request, res: Response) => {
  const { userid } = req.params

  const limit = parseInt(req.query.limit as string, 10)
  const offset = parseInt(req.query.offset as string, 10)

  if (!userid || typeof limit !== 'number' || typeof offset !== 'number') {
    defaultResponse({ res, status: 400, message: 'Missing query fields or type error' })
    return
  }

  const pagination = limit * offset

  try {
    const result = await getAllProductsByUserIdAndPaginationModel(userid, limit, pagination)
    defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving Products from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Products' })
  }
}

export const getAllProductsByCompanyId = async (req: Request, res: Response) => {
  const { companyid } = req.params

  try {
    const result = await getAllProductsByCompanyIdModel(companyid)
    defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving Products from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Products' })
  }
}

export const getAllProductsByCompanyIdAndPagination = async (req: Request, res: Response) => {
  const { companyid } = req.params

  const limit = parseInt(req.query.limit as string, 10)
  const offset = parseInt(req.query.offset as string, 10)

  if (!companyid || typeof limit !== 'number' || typeof offset !== 'number') {
    defaultResponse({ res, status: 400, message: 'Missing query fields or type error' })
    return
  }

  const pagination = limit * offset

  try {
    const result = await getAllProductsByCompanyIdAndPaginationModel(companyid, limit, pagination)
    defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving Products from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Products' })
  }
}

export const getAllProductsByCategoryIdAndPagination = async (req: Request, res: Response) => {
  const { categoryid } = req.params

  const limit = parseInt(req.query.limit as string, 10)
  const offset = parseInt(req.query.offset as string, 10)

  if (!categoryid || typeof limit !== 'number' || typeof offset !== 'number') {
    defaultResponse({ res, status: 400, message: 'Missing query fields or type error' })
    return
  }

  const pagination = limit * offset

  try {
    const result = await getAllProductsByCategoryIdAndPaginationModel(categoryid, limit, pagination)
    defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving Products from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Products' })
  }
}

export const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  try {
    const result = await getProductByIdModel(id)
    defaultResponse({ res, status: 200, message: 'User retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving user by ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving user' })
  }
}

export const postProduct = async (req: Request, res: Response) => {
  const { companyId, userId, name, description, price, weight, weightUnit, quantity } = req.body

  if (!userId || !name || !description || !price || !weight || !weightUnit || !quantity) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  try {
    const product = await postProductModel(companyId, userId, name, description, price, weight, weightUnit, quantity)
    defaultResponse({ res, status: 201, message: 'Product created successfully', data: product })
  } catch (e) {
    console.log('Error creating Product in database', e)
    defaultResponse({ res, status: 500, message: 'Error creating Product' })
  }
}

export const patchProduct = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const { name, description, price, weight, weightUnit, quantity } = req.body

  if (!name || !description || !price || !weight || !weightUnit || !quantity) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  try {
    const product = await patchProductModel(name, description, price, weight, weightUnit, quantity, id)
    defaultResponse({ res, status: 200, message: 'Product updated successfully', data: product })
  } catch (e) {
    console.log('Error updating Product in database', e)
    defaultResponse({ res, status: 500, message: 'Error updating Product' })
  }
}

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    await deleteProductModel(id)
    defaultResponse({ res, status: 200, message: 'Product deleted successfully' })
  } catch (e) {
    console.log('Error deleting Product in database', e)
    defaultResponse({ res, status: 500, message: 'Error deleting Product' })
  }
}
