import { Router } from 'express'
import { searchInCompanies, searchInProducts, searchInCategories } from '../controllers/search.js'

export const searchRouter = Router()

searchRouter.get('/companies/userid/:userid', searchInCompanies)
searchRouter.get('/products/userid/:userid', searchInProducts)
searchRouter.get('/categories/userid/:userid', searchInCategories)
