import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { loginUserModel } from '../models/auth.js';
import { defaultResponse } from '../utils/defaultRes.js';
import { getUserByEmailModel } from '../models/users.js';
const JWT_SECRET = 'your-secret-key';
const JWT_EXPIRATION = '4h';
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginUserModel(email);
        if (!result || result.rows.length === 0) {
            return defaultResponse({ res, status: 401, message: 'User not found', data: null });
        }
        const user = result.rows[0];
        if (!user.password || typeof user.password !== 'string') {
            return defaultResponse({ res, status: 500, message: 'Invalid password format', data: null });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return defaultResponse({ res, status: 401, message: 'Incorrect credentials', data: null });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        res.cookie('auth', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 4 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        return defaultResponse({
            res,
            status: 200,
            message: 'Authentication successful',
            data: { id: user.id, email: user.email },
        });
    }
    catch (e) {
        console.log('Error login user: ', e);
        return defaultResponse({ res, status: 500, message: 'Internal server error', data: null });
    }
};
export const verifyPassword = async (req, res) => {
    const token = req.cookies.auth;
    const { password } = req.body;
    if (!token) {
        defaultResponse({ res, status: 401, message: 'Authentication token missing' });
        return;
    }
    const decodedToken = jwt.decode(token);
    if (!decodedToken || !decodedToken.email) {
        defaultResponse({ res, status: 401, message: 'Invalid authentication token' });
        return;
    }
    const email = decodedToken.email;
    try {
        const result = await getUserByEmailModel(email);
        const user = result.rows[0];
        if (!user.password || typeof user.password !== 'string') {
            return defaultResponse({ res, status: 500, message: 'Invalid password format', data: null });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return defaultResponse({ res, status: 401, message: 'Incorrect credentials', data: null });
        }
        return defaultResponse({
            res,
            status: 200,
            message: 'Password correct',
            data: { id: user.id, email: user.email },
        });
    }
    catch (e) {
        console.log('Error retrieving user by email from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving user' });
    }
};
export const logoutUser = async (req, res) => {
    try {
        res.cookie('auth', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            expires: new Date(0),
        });
        res.clearCookie('auth');
        return defaultResponse({ res, status: 200, message: 'Logout successful', data: null });
    }
    catch (e) {
        console.log('Error logging out user: ', e);
        return defaultResponse({ res, status: 500, message: 'Internal server error', data: null });
    }
};
export const authToken = async (req, res) => {
    const token = req.cookies.auth;
    try {
        if (!token) {
            return defaultResponse({ res, status: 401, message: 'Token not provided', data: null });
        }
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return defaultResponse({ res, status: 401, message: 'Invalid or expired token', data: null });
            }
            return defaultResponse({ res, status: 200, message: 'Token is valid', data: decoded });
        });
    }
    catch (e) {
        console.log('Error auth token: ', e);
        return defaultResponse({ res, status: 500, message: 'Internal server error', data: null });
    }
};
