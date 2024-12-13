import { Router } from 'express';
import { getAllProductPrices, getAllProductPricesByUserId, getProductPriceById, getProductPriceByProductId, postProductPrice, deleteProductPrice } from '../controllers/productPrices.js';
export const productPricesRouter = Router();
productPricesRouter.get('/', getAllProductPrices);
productPricesRouter.get('/userid/:userid', getAllProductPricesByUserId);
productPricesRouter.get('/id/:id', getProductPriceById);
productPricesRouter.get('/productid/:productid', getProductPriceByProductId);
productPricesRouter.post('/', postProductPrice);
productPricesRouter.delete('/id/:id', deleteProductPrice);
