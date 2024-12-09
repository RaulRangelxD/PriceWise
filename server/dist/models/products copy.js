import db from '../config/database.js';
export const getAllProductsModel = async () => {
    const result = await db.execute(`SELECT * FROM products`);
    return result;
};
export const getAllProductsByUserIdModel = async (user_id) => {
    const result = await db.execute({ sql: `SELECT * FROM products WHERE user_id = :user_id`, args: { user_id } });
    return result;
};
export const getAllProductsByUserIdAndPaginationModel = async (user_id, limit, offset) => {
    const result = await db.execute({ sql: `SELECT * FROM products WHERE user_id = :user_id ORDER BY update_at DESC LIMIT :limit OFFSET :offset`, args: { user_id, limit, offset } });
    return result;
};
export const getProductByIdModel = async (id) => {
    const result = await db.execute({ sql: `SELECT * FROM products WHERE id = :id`, args: { id } });
    return result;
};
export const postProductModel = async (company_id, user_id, name, description, price) => {
    const result = await db.execute({
        sql: `INSERT INTO products (company_id, user_id, name, description, price) VALUES (:company_id, :user_id, :name, :description, :price)`,
        args: { company_id, user_id, name, description, price },
    });
    return result;
};
export const patchProductModel = async (name, description, price, id) => {
    const result = await db.execute({
        sql: `UPDATE products SET name = :name, description = :description, price = :price, update_at = CURRENT_TIMESTAMP WHERE id = :id`,
        args: { name, description, price, id },
    });
    return result;
};
export const deleteProductModel = async (id) => {
    const result = await db.execute({
        sql: `DELETE FROM products WHERE id = :id`,
        args: { id },
    });
    return result;
};
