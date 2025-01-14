import { getAllFacturesModel, getFactureByIdModel, getFacturesByUserIdModel, getAllFacturesByCompanyIdModel, getAllFacturesByCompanyIdAndPaginationModel, postFactureModel, patchFactureTotalAmountModel, deleteFactureModel, } from '../models/factures.js';
import { defaultResponse } from '../utils/defaultRes.js';
export const getAllFactures = async (req, res) => {
    try {
        const result = await getAllFacturesModel();
        defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving factures from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving factures' });
    }
};
export const getFactureById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getFactureByIdModel(id);
        defaultResponse({ res, status: 200, message: 'Facture retrieved successfully', data: result.rows[0] });
    }
    catch (e) {
        console.log('Error retrieving facture by ID from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving facture' });
    }
};
export const getFacturesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await getFacturesByUserIdModel(userId);
        defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving factures by user ID from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving factures' });
    }
};
export const getAllFacturesByCompanyId = async (req, res) => {
    const { companyId } = req.params;
    try {
        const result = await getAllFacturesByCompanyIdModel(companyId);
        defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving factures by company ID from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving factures' });
    }
};
export const getAllFacturesByCompanyIdAndPagination = async (req, res) => {
    const { companyid } = req.params;
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    console.log(companyid, offset, limit);
    if (!companyid || typeof limit !== 'number' || typeof offset !== 'number') {
        defaultResponse({ res, status: 400, message: 'Missing query fields or type error' });
        return;
    }
    try {
        const result = await getAllFacturesByCompanyIdAndPaginationModel(companyid, Number(limit), Number(offset));
        defaultResponse({ res, status: 200, message: 'Factures retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving factures by company ID with pagination from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving factures' });
    }
};
export const postFacture = async (req, res) => {
    const { userId, companyId, totalAmount, date } = req.body;
    console.log(userId, companyId, totalAmount, date);
    if (!userId || totalAmount === undefined || !companyId || !date) {
        defaultResponse({ res, status: 400, message: 'Missing required fields' });
        return;
    }
    try {
        const facture = await postFactureModel(userId, companyId, totalAmount, date);
        defaultResponse({ res, status: 201, message: 'Facture created successfully', data: facture });
    }
    catch (e) {
        console.log('Error creating facture in database', e);
        defaultResponse({ res, status: 500, message: 'Error creating facture' });
    }
};
export const patchFactureTotalAmount = async (req, res) => {
    const { id } = req.params;
    const { totalAmount } = req.body;
    if (totalAmount === undefined) {
        defaultResponse({ res, status: 400, message: 'Missing totalAmount field' });
        return;
    }
    try {
        await patchFactureTotalAmountModel(id, totalAmount);
        defaultResponse({ res, status: 200, message: 'Facture total amount updated successfully' });
    }
    catch (e) {
        console.log('Error updating facture total amount in database', e);
        defaultResponse({ res, status: 500, message: 'Error updating facture total amount' });
    }
};
export const deleteFacture = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteFactureModel(id);
        defaultResponse({ res, status: 200, message: 'Facture deleted successfully' });
    }
    catch (e) {
        console.log('Error deleting facture from database', e);
        defaultResponse({ res, status: 500, message: 'Error deleting facture' });
    }
};
