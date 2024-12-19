import { Request, Response } from 'express'
import { searchInCompaniesModel, searchInProductsModel, searchInCategoriesModel } from '../models/search.js'
import { defaultResponse } from '../utils/defaultRes.js'

export const searchInCompanies = async (req: Request<{ userid: string }>, res: Response): Promise<void> => {
  const { userid } = req.params
  const { keyword } = req.query

  if (!keyword || !userid) {
    return defaultResponse({ res, status: 400, message: 'UserId and keyword are required.' })
  }

  try {
    const result = await searchInCompaniesModel(keyword as string, userid)
    defaultResponse({ res, status: 200, message: 'Search retrieved successfully', data: result.rows })
  } catch (e) {
    console.error('Error retrieving Search from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Search' })
  }
}

export const searchInProducts = async (req: Request<{ userid: string }>, res: Response): Promise<void> => {
  const { userid } = req.params
  const { keyword } = req.query

  if (!keyword || !userid) {
    return defaultResponse({ res, status: 400, message: 'UserId and keyword are required.' })
  }

  try {
    const result = await searchInProductsModel(keyword as string, userid)
    defaultResponse({ res, status: 200, message: 'Search retrieved successfully', data: result.rows })
  } catch (e) {
    console.error('Error retrieving Search from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Search' })
  }
}

export const searchInCategories = async (req: Request<{ userid: string }>, res: Response): Promise<void> => {
  const { userid } = req.params
  const { keyword } = req.query

  if (!keyword || !userid) {
    return defaultResponse({ res, status: 400, message: 'UserId and keyword are required.' })
  }

  try {
    const result = await searchInCategoriesModel(keyword as string, userid)
    defaultResponse({ res, status: 200, message: 'Search retrieved successfully', data: result.rows })
  } catch (e) {
    console.error('Error retrieving Search from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Search' })
  }
}
