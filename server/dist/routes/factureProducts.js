import { Router } from 'express';
import { getAllFactureProducts, getFactureProductsByFactureId, getFactureProductsByProductId, postFactureProduct, deleteFactureProduct } from '../controllers/factureProducts.js';
export const factureProductsRouter = Router();
factureProductsRouter.get('/', getAllFactureProducts);
factureProductsRouter.get('/factureid/:facture_id', getFactureProductsByFactureId);
factureProductsRouter.get('/productid/:product_id', getFactureProductsByProductId);
factureProductsRouter.post('/', postFactureProduct);
factureProductsRouter.delete('/id/:id', deleteFactureProduct);
