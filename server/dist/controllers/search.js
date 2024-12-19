import { searchInCompaniesModel, searchInProductsModel, searchInCategoriesModel } from '../models/search.js';
import { defaultResponse } from '../utils/defaultRes.js';
export const searchInCompanies = async (req, res) => {
    const { userid } = req.params;
    const { keyword } = req.query;
    if (!keyword || !userid) {
        return defaultResponse({ res, status: 400, message: 'UserId and keyword are required.' });
    }
    try {
        const result = await searchInCompaniesModel(keyword, userid);
        defaultResponse({ res, status: 200, message: 'Search retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.error('Error retrieving Search from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Search' });
    }
};
export const searchInProducts = async (req, res) => {
    const { userid } = req.params;
    const { keyword } = req.query;
    if (!keyword || !userid) {
        return defaultResponse({ res, status: 400, message: 'UserId and keyword are required.' });
    }
    try {
        const result = await searchInProductsModel(keyword, userid);
        defaultResponse({ res, status: 200, message: 'Search retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.error('Error retrieving Search from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Search' });
    }
};
export const searchInCategories = async (req, res) => {
    const { userid } = req.params;
    const { keyword } = req.query;
    if (!keyword || !userid) {
        return defaultResponse({ res, status: 400, message: 'UserId and keyword are required.' });
    }
    try {
        const result = await searchInCategoriesModel(keyword, userid);
        defaultResponse({ res, status: 200, message: 'Search retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.error('Error retrieving Search from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Search' });
    }
};
