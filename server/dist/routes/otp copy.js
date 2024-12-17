import { Router } from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp.js';
export const otpsRouter = Router();
otpsRouter.post('/send', sendOTP);
otpsRouter.post('/verify', verifyOTP);
