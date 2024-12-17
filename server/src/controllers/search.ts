import { Request, Response } from 'express'
import { searchInTableModel } from '../models/search.js'
import { defaultResponse } from '../utils/defaultRes.js'

export const searchInTable = async (req: Request<{ userid: string }>, res: Response): Promise<void> => {
  const { userid } = req.params
  const { table, keyword } = req.query

  if (!table || !keyword || !userid) {
    return defaultResponse({ res, status: 400, message: 'Table and keyword are required.' })
  }

  try {
    const result = await searchInTableModel(table as string, keyword as string, userid)
    defaultResponse({ res, status: 200, message: 'Search retrieved successfully', data: result.rows })
  } catch (e) {
    console.error('Error retrieving Search from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving Search' })
  }
}
