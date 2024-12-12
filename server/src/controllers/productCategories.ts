import {
  getAllProductCategoriesModel,
  getAllProductCategoriesByUserIdModel,
  getProductCategoryByIdModel,
  getProductCategoryByProductIdModel,
  getProductCategoryByCategoryIdModel,
  postProductCategoryModel,
  deleteProductCategoryModel,
  deleteProductCategoryByProductIdAndCategoryIdModel,
} from '../models/productCategories.js'
import { defaultResponse } from '../utils/defaultRes.js'
import { Request, Response } from 'express'

export const getAllProductCategories = async (req: Request, res: Response) => {
  try {
    const result = await getAllProductCategoriesModel()
    defaultResponse({ res, status: 200, message: 'ProductCategories retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving ProductCategories from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductCategories' })
  }
}

export const getAllProductCategoriesByUserId = async (req: Request, res: Response) => {
  const { userid } = req.params

  try {
    const result = await getAllProductCategoriesByUserIdModel(userid)
    defaultResponse({ res, status: 200, message: 'ProductCategories retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving ProductCategories from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductCategories' })
  }
}

export const getProductCategoryById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  try {
    const result = await getProductCategoryByIdModel(id)
    defaultResponse({ res, status: 200, message: 'ProductCategory retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving ProductCategory by ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductCategory' })
  }
}

export const getProductCategoryByProductId = async (req: Request<{ productid: string }>, res: Response) => {
  const { productid } = req.params
  try {
    const result = await getProductCategoryByProductIdModel(productid)
    defaultResponse({ res, status: 200, message: 'ProductCategory retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving ProductCategory by ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductCategory' })
  }
}

export const getProductCategoryByCategoryId = async (req: Request<{ categoryId: string }>, res: Response) => {
  const { categoryId } = req.params
  try {
    const result = await getProductCategoryByCategoryIdModel(categoryId)
    defaultResponse({ res, status: 200, message: 'ProductCategory retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving ProductCategory by ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving ProductCategory' })
  }
}

export const postProductCategory = async (req: Request, res: Response) => {
  const { productId, categoryId } = req.body

  if (!productId || !categoryId) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  try {
    await postProductCategoryModel(productId, categoryId)
    defaultResponse({ res, status: 201, message: 'ProductCategory create successfully' })
  } catch (e) {
    console.log('Error creating ProductCategory in database', e)
    defaultResponse({ res, status: 500, message: 'Error creating ProductCategory' })
  }
}

export const deleteProductCategory = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    await deleteProductCategoryModel(id)
    defaultResponse({ res, status: 200, message: 'ProductCategory deleted successfully' })
  } catch (e) {
    console.log('Error deleting ProductCategory in database', e)
    defaultResponse({ res, status: 500, message: 'Error deleting ProductCategory' })
  }
}

export const deleteProductCategoryByProductIdAndCategoryId = async (req: Request<{ product_id: string; category_id: string }>, res: Response) => {
  const { productId, categoryId } = req.query

  try {
    await deleteProductCategoryByProductIdAndCategoryIdModel(String(productId), String(categoryId))
    defaultResponse({ res, status: 200, message: 'ProductCategory deleted successfully' })
  } catch (e) {
    console.log('Error deleting ProductCategory in database', e)
    defaultResponse({ res, status: 500, message: 'Error deleting ProductCategory' })
  }
}
