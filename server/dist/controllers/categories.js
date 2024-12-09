import { getAllCategoriesModel, getAllCategoriesByUserIdModel, getCategoryByIdModel, postCategoryModel, patchCategoryModel, deleteCategoryModel } from '../models/categories.js';
import { defaultResponse } from '../utils/defaultRes.js';
export const getAllCategories = async (req, res) => {
    try {
        const result = await getAllCategoriesModel();
        defaultResponse({ res, status: 200, message: 'Categories retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving Categories from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Categories' });
    }
};
export const getAllCategoriesByUserId = async (req, res) => {
    const { userid } = req.params;
    try {
        const result = await getAllCategoriesByUserIdModel(userid);
        defaultResponse({ res, status: 200, message: 'Categories retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving Categories from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Categories' });
    }
};
export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getCategoryByIdModel(id);
        defaultResponse({ res, status: 200, message: 'Category retrieved successfully', data: result.rows[0] });
    }
    catch (e) {
        console.log('Error retrieving Category by ID from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Category' });
    }
};
export const postCategory = async (req, res) => {
    const { userId, name } = req.body;
    if (!userId || !name) {
        defaultResponse({ res, status: 400, message: 'Missing required fields' });
        return;
    }
    try {
        await postCategoryModel(userId, name);
        defaultResponse({ res, status: 201, message: 'Category create successfully' });
    }
    catch (e) {
        console.log('Error creating Category in database', e);
        defaultResponse({ res, status: 500, message: 'Error creating Category' });
    }
};
export const patchCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        defaultResponse({ res, status: 400, message: 'Missing required fields' });
        return;
    }
    try {
        await patchCategoryModel(name, id);
        defaultResponse({ res, status: 200, message: 'Category updated successfully' });
    }
    catch (e) {
        console.log('Error updating Category in database', e);
        defaultResponse({ res, status: 500, message: 'Error updating Category' });
    }
};
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCategoryModel(id);
        defaultResponse({ res, status: 200, message: 'Category deleted successfully' });
    }
    catch (e) {
        console.log('Error deleting Category in database', e);
        defaultResponse({ res, status: 500, message: 'Error deleting Category' });
    }
};
