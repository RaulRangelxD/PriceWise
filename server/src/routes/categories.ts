import { Router } from 'express'
import {
  getAllCategories,
  getAllCategoriesByUserId,
  getAllCategoriesByUserIdAndNotInProductId,
  getAllCategoriesInProductId,
  getAllCategoriesByUserIdAndPagination,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory,
} from '../controllers/categories.js'

export const categoriesRouter = Router()

categoriesRouter.get('/', getAllCategories)
categoriesRouter.get('/userid/:userid', getAllCategoriesByUserId)
categoriesRouter.get('/userid/notproductid/:userid', getAllCategoriesByUserIdAndNotInProductId)
categoriesRouter.get('/userid/productid/:productid', getAllCategoriesInProductId)
categoriesRouter.get('/userid/pag/:userid', getAllCategoriesByUserIdAndPagination)
categoriesRouter.get('/id/:id', getCategoryById)

categoriesRouter.post('/', postCategory)

categoriesRouter.patch('/id/:id', patchCategory)

categoriesRouter.delete('/id/:id', deleteCategory)
