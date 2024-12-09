import { Router } from 'express';
import { getAllCategories, getAllCategoriesByUserId, getCategoryById, postCategory, patchCategory, deleteCategory } from '../controllers/categories.js';
export const categoriesRouter = Router();
categoriesRouter.get('/', getAllCategories);
categoriesRouter.get('/userid/:userid', getAllCategoriesByUserId);
categoriesRouter.get('/id/:id', getCategoryById);
categoriesRouter.post('/', postCategory);
categoriesRouter.patch('/id/:id', patchCategory);
categoriesRouter.delete('/id/:id', deleteCategory);
