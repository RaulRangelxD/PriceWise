import { getAllProductsModel, getAllProductsByUserIdModel, getAllProductsByUserIdAndPaginationModel, getAllProductsByCompanyIdAndPaginationModel, getAllProductsByCategoryIdAndPaginationModel, getProductByIdModel, postProductModel, patchProductModel, deleteProductModel, } from '../models/products.js';
import { defaultResponse } from '../utils/defaultRes.js';
export const getAllProducts = async (req, res) => {
    try {
        const result = await getAllProductsModel();
        defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving Products from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Products' });
    }
};
export const getAllProductsByUserId = async (req, res) => {
    const { userid } = req.params;
    try {
        const result = await getAllProductsByUserIdModel(userid);
        defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving Products from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Products' });
    }
};
export const getAllProductsByUserIdAndPagination = async (req, res) => {
    const { userid } = req.params;
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    if (!userid || typeof limit !== 'number' || typeof offset !== 'number') {
        defaultResponse({ res, status: 400, message: 'Missing query fields or type error' });
        return;
    }
    const pagination = limit * offset;
    try {
        const result = await getAllProductsByUserIdAndPaginationModel(userid, limit, pagination);
        defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving Products from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Products' });
    }
};
export const getAllProductsByCompanyIdAndPagination = async (req, res) => {
    const { companyid } = req.params;
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    if (!companyid || typeof limit !== 'number' || typeof offset !== 'number') {
        defaultResponse({ res, status: 400, message: 'Missing query fields or type error' });
        return;
    }
    const pagination = limit * offset;
    try {
        const result = await getAllProductsByCompanyIdAndPaginationModel(companyid, limit, pagination);
        defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving Products from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Products' });
    }
};
export const getAllProductsByCategoryIdAndPagination = async (req, res) => {
    const { categoryid } = req.params;
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    if (!categoryid || typeof limit !== 'number' || typeof offset !== 'number') {
        defaultResponse({ res, status: 400, message: 'Missing query fields or type error' });
        return;
    }
    const pagination = limit * offset;
    try {
        const result = await getAllProductsByCategoryIdAndPaginationModel(categoryid, limit, pagination);
        defaultResponse({ res, status: 200, message: 'Products retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving Products from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Products' });
    }
};
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getProductByIdModel(id);
        defaultResponse({ res, status: 200, message: 'User retrieved successfully', data: result.rows[0] });
    }
    catch (e) {
        console.log('Error retrieving user by ID from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving user' });
    }
};
export const postProduct = async (req, res) => {
    const { companyId, userId, name, description, price, weight, weightUnit, quantity } = req.body;
    if (!userId || !name || !description || !price || !weight || !weightUnit || !quantity) {
        defaultResponse({ res, status: 400, message: 'Missing required fields' });
        return;
    }
    try {
        const product = await postProductModel(companyId, userId, name, description, price, weight, weightUnit, quantity);
        defaultResponse({ res, status: 201, message: 'Product created successfully', data: product });
    }
    catch (e) {
        console.log('Error creating Product in database', e);
        defaultResponse({ res, status: 500, message: 'Error creating Product' });
    }
};
export const patchProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, weight, weightUnit, quantity } = req.body;
    if (!name || !description || !price || !weight || !weightUnit || !quantity) {
        defaultResponse({ res, status: 400, message: 'Missing required fields' });
        return;
    }
    try {
        const product = await patchProductModel(name, description, price, weight, weightUnit, quantity, id);
        defaultResponse({ res, status: 200, message: 'Product updated successfully', data: product });
    }
    catch (e) {
        console.log('Error updating Product in database', e);
        defaultResponse({ res, status: 500, message: 'Error updating Product' });
    }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProductModel(id);
        defaultResponse({ res, status: 200, message: 'Product deleted successfully' });
    }
    catch (e) {
        console.log('Error deleting Product in database', e);
        defaultResponse({ res, status: 500, message: 'Error deleting Product' });
    }
};
