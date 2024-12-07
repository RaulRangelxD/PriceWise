import { getAllCompaniesModel, getAllCompaniesByUserIdModel, getAllCompaniesByUserIdAndPaginationModel, getCompanyByIdModel, postCompanyModel, patchCompanyModel, deleteCompanyModel, } from '../models/companies.js';
import { defaultResponse } from '../utils/defaultRes.js';
export const getAllCompanies = async (req, res) => {
    try {
        const result = await getAllCompaniesModel();
        defaultResponse({ res, status: 200, message: 'Users retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving users from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving users' });
    }
};
export const getAllCompaniesByUserId = async (req, res) => {
    const { userid } = req.params;
    try {
        const result = await getAllCompaniesByUserIdModel(userid);
        defaultResponse({ res, status: 200, message: 'Users retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving users from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving users' });
    }
};
export const getAllCompaniesByUserIdAndPagination = async (req, res) => {
    const { userid } = req.params;
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    if (!userid || typeof limit !== 'number' || typeof offset !== 'number') {
        defaultResponse({ res, status: 400, message: 'Missing query fields or type error' });
        return;
    }
    const pagination = limit * offset;
    try {
        const result = await getAllCompaniesByUserIdAndPaginationModel(userid, limit, pagination);
        defaultResponse({ res, status: 200, message: 'Companies retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving Companies from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving Companies' });
    }
};
export const getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getCompanyByIdModel(id);
        defaultResponse({ res, status: 200, message: 'User retrieved successfully', data: result.rows[0] });
    }
    catch (e) {
        console.log('Error retrieving user by ID from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving user' });
    }
};
export const postCompany = async (req, res) => {
    const { userId, name, rif, phone, address } = req.body;
    if (!userId || !name || !rif || !phone || !address) {
        defaultResponse({ res, status: 400, message: 'Missing required fields' });
        return;
    }
    try {
        await postCompanyModel(userId, name, rif, phone, address);
        defaultResponse({ res, status: 201, message: 'Company create successfully' });
    }
    catch (e) {
        console.log('Error creating Company in database', e);
        defaultResponse({ res, status: 500, message: 'Error creating Company' });
    }
};
export const patchCompany = async (req, res) => {
    const { id } = req.params;
    const { name, rif, phone, address } = req.body;
    if (!name || !rif || !phone || !address) {
        defaultResponse({ res, status: 400, message: 'Missing required fields' });
        return;
    }
    try {
        await patchCompanyModel(name, rif, phone, address, id);
        defaultResponse({ res, status: 200, message: 'Company updated successfully' });
    }
    catch (e) {
        console.log('Error updating Company in database', e);
        defaultResponse({ res, status: 500, message: 'Error updating Company' });
    }
};
export const deleteCompany = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCompanyModel(id);
        defaultResponse({ res, status: 200, message: 'Company deleted successfully' });
    }
    catch (e) {
        console.log('Error deleting Company in database', e);
        defaultResponse({ res, status: 500, message: 'Error deleting Company' });
    }
};
