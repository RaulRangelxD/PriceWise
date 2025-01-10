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
export const getAllFacturesByCompanyIdModel = async (company_id) => {
    const result = await db.execute({
        sql: `
    SELECT f.*, 
    COALESCE(GROUP_CONCAT(p.name || ' (x' || fp.quantity || ')'), '') AS products
    FROM factures AS f
    LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
    LEFT JOIN products AS p ON p.id = fp.product_id
    WHERE p.company_id = :company_id
    GROUP BY f.id
    ORDER BY f.issue_date DESC`,
        args: { company_id },
    });
    return result;
};
export const getAllFacturesByCompanyIdAndPaginationModel = async (company_id, limit, offset) => {
    const result = await db.execute({
        sql: `
    SELECT f.*, 
    COALESCE(GROUP_CONCAT(p.name || ' (x' || fp.quantity || ')'), '') AS products
    FROM factures AS f
    LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
    LEFT JOIN products AS p ON p.id = fp.product_id
    WHERE p.company_id = :company_id
    GROUP BY f.id
    ORDER BY f.issue_date DESC
    LIMIT :limit
    OFFSET :offset`,
        args: { company_id, limit, offset },
    });
    return result;
};
export const postFactureModel = async (user_id, company_id, total_amount, due_date = null) => {
    const result = await db.execute({
        sql: `
      INSERT INTO factures (user_id, company_id, total_amount, due_date)
      VALUES (:user_id, :company_id, :total_amount, :due_date)`,
        args: {
            user_id,
            company_id,
            total_amount,
            due_date,
        },
    });
    return result;
};
export const patchFactureTotalAmountModel = async (id, totalAmount) => {
    const result = await db.execute({
        sql: `UPDATE factures SET total_amount = :totalAmount, update_at = CURRENT_TIMESTAMP WHERE id = :id`,
        args: { id, totalAmount },
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
