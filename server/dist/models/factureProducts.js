import db from '../config/database.js';
export const getAllFactureProductsModel = async () => {
    const result = await db.execute(`SELECT * FROM facture_products`);
    return result;
};
export const getFactureProductsByFactureIdModel = async (facture_id) => {
    const result = await db.execute({
        sql: `SELECT * FROM facture_products WHERE facture_id = :facture_id`,
        args: { facture_id },
    });
    return result;
};
export const getAllFactureProductsByFactureIdAndPaginationModel = async (facture_id, limit, offset) => {
    const result = await db.execute({ sql: `SELECT * FROM facture_products WHERE facture_id = :facture_id ORDER BY create_at DESC LIMIT :limit OFFSET :offset`, args: { facture_id, limit, offset } });
    return result;
};
export const getFactureProductsByProductIdModel = async (product_id) => {
    const result = await db.execute({
        sql: `SELECT * FROM facture_products WHERE product_id = :product_id`,
        args: { product_id },
    });
    return result;
};
export const postFactureProductModel = async (facture_id, product_id, quantity, total_price) => {
    const result = await db.execute({
        sql: `INSERT INTO facture_products (facture_id, product_id, quantity, total_price) VALUES (:facture_id, :product_id, :quantity, :total_price)`,
        args: { facture_id, product_id, quantity, total_price },
    });
    return result;
};
export const deleteFactureProductModel = async (id) => {
    const result = await db.execute({
        sql: `DELETE FROM facture_products WHERE id = :id`,
        args: { id },
    });
    return result;
};
