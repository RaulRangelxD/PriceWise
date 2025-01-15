import { getAllFactureProductsModel, getFactureProductsByFactureIdModel, getAllFactureProductsByFactureIdAndPaginationModel, getFactureProductsByProductIdModel, postFactureProductModel, deleteFactureProductModel, } from '../models/factureProducts.js';
import { defaultResponse } from '../utils/defaultRes.js';
export const getAllFactureProducts = async (req, res) => {
    try {
        const result = await getAllFactureProductsModel();
        defaultResponse({
            res,
            status: 200,
            message: 'Facture products retrieved successfully',
            data: result.rows,
        });
    }
    catch (e) {
        console.error('Error retrieving facture products from database', e);
        defaultResponse({
            res,
            status: 500,
            message: 'Error retrieving facture products',
        });
    }
};
export const getFactureProductsByFactureId = async (req, res) => {
    const { facture_id } = req.params;
    try {
        const result = await getFactureProductsByFactureIdModel(facture_id);
        defaultResponse({
            res,
            status: 200,
            message: 'Facture products retrieved successfully',
            data: result.rows,
        });
    }
    catch (e) {
        console.error('Error retrieving facture products by facture ID', e);
        defaultResponse({
            res,
            status: 500,
            message: 'Error retrieving facture products',
        });
    }
};
export const getAllFactureProductsByFactureIdAndPagination = async (req, res) => {
    const { factureid } = req.params;
    const limit = parseInt(req.query.limit, 10);
    const offset = parseInt(req.query.offset, 10);
    if (!factureid || typeof limit !== 'number' || typeof offset !== 'number') {
        defaultResponse({ res, status: 400, message: 'Missing query fields or type error' });
        return;
    }
    const pagination = limit * offset;
    try {
        const result = await getAllFactureProductsByFactureIdAndPaginationModel(factureid, limit, pagination);
        defaultResponse({ res, status: 200, message: 'ProductPrices retrieved successfully', data: result.rows });
    }
    catch (e) {
        console.log('Error retrieving ProductPrices from database', e);
        defaultResponse({ res, status: 500, message: 'Error retrieving ProductPrices' });
    }
};
export const getFactureProductsByProductId = async (req, res) => {
    const { product_id } = req.params;
    try {
        const result = await getFactureProductsByProductIdModel(product_id);
        defaultResponse({
            res,
            status: 200,
            message: 'Facture products retrieved successfully',
            data: result.rows,
        });
    }
    catch (e) {
        console.error('Error retrieving facture products by product ID', e);
        defaultResponse({
            res,
            status: 500,
            message: 'Error retrieving facture products',
        });
    }
};
export const postFactureProduct = async (req, res) => {
    const { factureId, productId, quantity, totalPrice } = req.body;
    if (!factureId || !productId || quantity === undefined || totalPrice === undefined) {
        defaultResponse({
            res,
            status: 400,
            message: 'Missing required fields',
        });
        return;
    }
    try {
        await postFactureProductModel(factureId, productId, quantity, totalPrice);
        defaultResponse({
            res,
            status: 201,
            message: 'Facture product created successfully',
        });
    }
    catch (e) {
        console.error('Error creating facture product in database', e);
        defaultResponse({
            res,
            status: 500,
            message: 'Error creating facture product',
        });
    }
};
export const deleteFactureProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteFactureProductModel(id);
        defaultResponse({
            res,
            status: 200,
            message: 'Facture product deleted successfully',
        });
    }
    catch (e) {
        console.error('Error deleting facture product in database', e);
        defaultResponse({
            res,
            status: 500,
            message: 'Error deleting facture product',
        });
    }
};
