import { Router } from 'express'
import { getAllProducts, getAllProductsByUserId, getAllProductsByUserIdAndPagination, getProductById, postProduct, patchProduct, deleteProduct } from '../controllers/products.js'

export const productsRouter = Router()

productsRouter.get('/', getAllProducts)
productsRouter.get('/userid/:userid', getAllProductsByUserId)
productsRouter.get('/userid/pag/:userid', getAllProductsByUserIdAndPagination)
productsRouter.get('/id/:id', getProductById)

productsRouter.post('/', postProduct)

productsRouter.patch('/id/:id', patchProduct)

productsRouter.delete('/id/:id', deleteProduct)
