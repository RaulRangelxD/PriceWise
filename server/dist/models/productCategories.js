import db from '../config/database.js';
export const getAllProductCategoriesModel = async () => {
    const result = await db.execute(`SELECT * FROM product_categories`);
    return result;
};
export const getAllProductCategoriesByUserIdModel = async (user_id) => {
    const result = await db.execute({ sql: `SELECT * FROM product_categories WHERE user_id = :user_id`, args: { user_id } });
    return result;
};
export const getProductCategoryByIdModel = async (id) => {
    const result = await db.execute({ sql: `SELECT * FROM product_categories WHERE id = :id`, args: { id } });
    return result;
};
export const getProductCategoryByProductIdModel = async (product_id) => {
    const result = await db.execute({ sql: `SELECT * FROM product_categories WHERE product_id = :product_id`, args: { product_id } });
    return result;
};
export const getProductCategoryByCategoryIdModel = async (category_id) => {
    const result = await db.execute({ sql: `SELECT * FROM product_categories WHERE category_id = :category_id`, args: { category_id } });
    return result;
};
export const postProductCategoryModel = async (product_id, category_id) => {
    const result = await db.execute({
        sql: `INSERT INTO product_categories (product_id, category_id) VALUES (:product_id , :category_id)`,
        args: { product_id, category_id },
    });
    return result;
};
export const deleteProductCategoryModel = async (id) => {
    const result = await db.execute({
        sql: `DELETE FROM product_categories WHERE id = :id`,
        args: { id },
    });
    return result;
};
export const deleteProductCategoryByProductIdAndCategoryIdModel = async (product_id, category_id) => {
    const result = await db.execute({
        sql: `DELETE FROM product_categories WHERE product_id = :product_id AND category_id = :category_id`,
        args: { product_id, category_id },
    });
    return result;
};
