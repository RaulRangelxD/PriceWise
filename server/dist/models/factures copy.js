import db from '../config/database.js';
export const getAllFacturesModel = async () => {
    const result = await db.execute(`SELECT * FROM factures`);
    return result;
};
export const getFactureByIdModel = async (id) => {
    const result = await db.execute({
        sql: `SELECT * FROM factures WHERE id = :id`,
        args: { id },
    });
    return result;
};
export const getFacturesByUserIdModel = async (user_id) => {
    const result = await db.execute({
        sql: `SELECT * FROM factures WHERE user_id = :user_id ORDER BY create_at DESC`,
        args: { user_id },
    });
    return result;
};
export const postFactureModel = async (user_id, total_amount) => {
    const result = await db.execute({
        sql: `INSERT INTO factures (user_id, total_amount) VALUES (:user_id, :total_amount)`,
        args: { user_id, total_amount },
    });
    return result;
};
export const deleteFactureModel = async (id) => {
    const result = await db.execute({
        sql: `DELETE FROM factures WHERE id = :id`,
        args: { id },
    });
    return result;
};
