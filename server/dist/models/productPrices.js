import db from '../config/database.js';
export const getAllProductPricesModel = async () => {
    const result = await db.execute(`SELECT * FROM product_prices`);
    return result;
};
export const getAllProductPricesByUserIdModel = async (user_id) => {
    const result = await db.execute({ sql: `SELECT * FROM product_prices WHERE user_id = :user_id`, args: { user_id } });
    return result;
};
export const getProductPriceByIdModel = async (id) => {
    const result = await db.execute({ sql: `SELECT * FROM product_prices WHERE id = :id`, args: { id } });
    return result;
};
export const getProductPriceByProductIdModel = async (product_id) => {
    const result = await db.execute({ sql: `SELECT * FROM product_prices WHERE product_id = :product_id`, args: { product_id } });
    return result;
};
export const getAllProductPricesByProductIdAndPaginationModel = async (product_id, limit, offset) => {
    const result = await db.execute({ sql: `SELECT * FROM product_prices WHERE product_id = :product_id ORDER BY create_at DESC LIMIT :limit OFFSET :offset`, args: { product_id, limit, offset } });
    return result;
};
export const postProductPriceModel = async (product_id, price) => {
    const result = await db.execute({
        sql: `INSERT INTO product_prices (product_id, price) VALUES (:product_id , :price)`,
        args: { product_id, price },
    });
    return result;
};
export const deleteProductPriceModel = async (id) => {
    const result = await db.execute({
        sql: `DELETE FROM product_prices WHERE id = :id`,
        args: { id },
    });
    return result;
};
