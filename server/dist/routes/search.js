import { Router } from 'express';
import { searchInTable } from '../controllers/search.js';
export const searchRouter = Router();
searchRouter.get('/userid/:userid', searchInTable);
