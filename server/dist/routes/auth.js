import { Router } from 'express';
import { loginUser, verifyPassword, logoutUser, authToken } from '../controllers/auth.js';
export const authRouter = Router();
authRouter.get('/authtoken', authToken);
authRouter.post('/verifypassword', verifyPassword);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
