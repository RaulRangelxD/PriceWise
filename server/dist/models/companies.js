import db from '../config/database.js';
export const getAllCompaniesModel = async () => {
    const result = await db.execute(`SELECT * FROM companies`);
    return result;
};
export const getAllCompaniesByUserIdModel = async (user_id) => {
    const result = await db.execute({ sql: `SELECT * FROM companies WHERE user_id = :user_id`, args: { user_id } });
    return result;
};
export const getAllCompaniesByUserIdAndPaginationModel = async (user_id, limit, offset) => {
    const result = await db.execute({ sql: `SELECT * FROM companies WHERE user_id = :user_id ORDER BY update_at DESC LIMIT :limit OFFSET :offset`, args: { user_id, limit, offset } });
    return result;
};
export const getCompanyByIdModel = async (id) => {
    const result = await db.execute({ sql: `SELECT * FROM companies WHERE id = :id`, args: { id } });
    return result;
};
export const postCompanyModel = async (user_id, name, rif, phone, address) => {
    const result = await db.execute({
        sql: `INSERT INTO companies (user_id, name, rif, phone, address) VALUES (:user_id, :name, :rif, :phone, :address)`,
        args: { user_id, name, rif, phone, address },
    });
    return result;
};
export const patchCompanyModel = async (name, rif, phone, address, id) => {
    const result = await db.execute({
        sql: `UPDATE companies SET name = :name, rif = :rif, phone = :phone, address = :address, update_at = CURRENT_TIMESTAMP WHERE id = :id`,
        args: { name, rif, phone, address, id },
    });
    return result;
};
export const deleteCompanyModel = async (id) => {
    const result = await db.execute({
        sql: `DELETE FROM companies WHERE id = :id`,
        args: { id },
    });
    return result;
};
