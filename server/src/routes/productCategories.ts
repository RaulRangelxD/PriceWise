import { Router } from 'express'
import {
  getAllProductCategories,
  getAllProductCategoriesByUserId,
  getProductCategoryById,
  getProductCategoryByProductId,
  getProductCategoryByCategoryId,
  postProductCategory,
  deleteProductCategory,
  deleteProductCategoryByProductIdAndCategoryId,
} from '../controllers/productCategories.js'

export const productCategoriesRouter = Router()

productCategoriesRouter.get('/', getAllProductCategories)
productCategoriesRouter.get('/userid/:userid', getAllProductCategoriesByUserId)
productCategoriesRouter.get('/id/:id', getProductCategoryById)
productCategoriesRouter.get('/productid/:productid', getProductCategoryByProductId)
productCategoriesRouter.get('/categoryid/:categoryid', getProductCategoryByCategoryId)

productCategoriesRouter.post('/', postProductCategory)

productCategoriesRouter.delete('/id/:id', deleteProductCategory)
productCategoriesRouter.delete('/productidandcategoryid/', deleteProductCategoryByProductIdAndCategoryId)
