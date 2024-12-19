import db from '../config/database.js';
export const searchInCompaniesModel = async (keyword, user_id) => {
    try {
        const query = `
      SELECT * 
      FROM companies 
      WHERE name LIKE ? AND user_id = ? 
      ORDER BY create_at DESC;
    `;
        const results = await db.execute({ sql: query, args: [`%${keyword}%`, user_id] });
        return results;
    }
    catch (e) {
        console.error(`Error searching in companies:`, e);
        throw e;
    }
};
export const searchInProductsModel = async (keyword, user_id) => {
    try {
        const query = `
      SELECT *, (price / quantity) AS unit_price 
      FROM products 
      WHERE name LIKE ? AND user_id = ? 
      ORDER BY unit_price ASC;
    `;
        const results = await db.execute({ sql: query, args: [`%${keyword}%`, user_id] });
        return results;
    }
    catch (e) {
        console.error(`Error searching in products:`, e);
        throw e;
    }
};
export const searchInCategoriesModel = async (keyword, user_id) => {
    try {
        const query = `
      SELECT * 
      FROM categories 
      WHERE name LIKE ? AND user_id = ? 
      ORDER BY create_at DESC;
    `;
        const results = await db.execute({ sql: query, args: [`%${keyword}%`, user_id] });
        return results;
    }
    catch (e) {
        console.error(`Error searching in categories:`, e);
        throw e;
    }
};
