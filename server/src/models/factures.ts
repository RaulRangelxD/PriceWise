import db from '../config/database.js'

export const getAllFacturesModel = async () => {
  const result = await db.execute(`
    SELECT f.*, c.name AS company_name, 
    COALESCE(GROUP_CONCAT(p.name || ' ' || fp.quantity, ', '), '') AS products
    FROM factures AS f
    LEFT JOIN companies AS c ON f.company_id = c.id
    LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
    LEFT JOIN products AS p ON p.id = fp.product_id
    GROUP BY f.id
    ORDER BY f.date DESC
  `)
  return result
}

export const getFactureByIdModel = async (id: string) => {
  const result = await db.execute({
    sql: `
      SELECT f.*, c.name AS company_name, 
      COALESCE(GROUP_CONCAT(p.name || ' ' || fp.quantity, ', '), '') AS products
      FROM factures AS f
      LEFT JOIN companies AS c ON f.company_id = c.id
      LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
      LEFT JOIN products AS p ON p.id = fp.product_id
      WHERE f.id = :id
      GROUP BY f.id
    `,
    args: { id },
  })
  return result
}

export const getFacturesByUserIdModel = async (user_id: string) => {
  const result = await db.execute({
    sql: `
      SELECT f.*, c.name AS company_name, 
      COALESCE(GROUP_CONCAT(p.name || ' ' || fp.quantity, ', '), '') AS products
      FROM factures AS f
      LEFT JOIN companies AS c ON f.company_id = c.id
      LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
      LEFT JOIN products AS p ON p.id = fp.product_id
      WHERE f.user_id = :user_id
      GROUP BY f.id
      ORDER BY f.date DESC
    `,
    args: { user_id },
  })
  return result
}

export const getAllFacturesByUserIdAndPaginationModel = async (user_id: string, limit: number, offset: number) => {
  const result = await db.execute({
    sql: `
      SELECT f.*, c.name AS company_name, 
      COALESCE(GROUP_CONCAT(p.name || ' ' || fp.quantity, ', '), '') AS products
      FROM factures AS f
      LEFT JOIN companies AS c ON f.company_id = c.id
      LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
      LEFT JOIN products AS p ON p.id = fp.product_id
      WHERE f.user_id = :user_id
      GROUP BY f.id
      ORDER BY f.date DESC
      LIMIT :limit OFFSET :offset
    `,
    args: { user_id, limit, offset },
  })
  return result
}

export const getAllFacturesByCompanyIdModel = async (company_id: string) => {
  const result = await db.execute({
    sql: `
      SELECT f.*, c.name AS company_name, 
      COALESCE(GROUP_CONCAT(p.name || ' ' || fp.quantity, ', '), '') AS products
      FROM factures AS f
      LEFT JOIN companies AS c ON f.company_id = c.id
      LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
      LEFT JOIN products AS p ON p.id = fp.product_id
      WHERE f.company_id = :company_id
      GROUP BY f.id
      ORDER BY f.date DESC
    `,
    args: { company_id },
  })
  return result
}

export const getAllFacturesByCompanyIdAndPaginationModel = async (company_id: string, limit: number, offset: number) => {
  const result = await db.execute({
    sql: `
      SELECT f.*, c.name AS company_name, 
      COALESCE(GROUP_CONCAT(p.name || ' ' || fp.quantity, ', '), '') AS products
      FROM factures AS f
      LEFT JOIN companies AS c ON f.company_id = c.id
      LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
      LEFT JOIN products AS p ON p.id = fp.product_id
      WHERE f.company_id = :company_id
      GROUP BY f.id
      ORDER BY f.date DESC
      LIMIT :limit OFFSET :offset
    `,
    args: { company_id, limit, offset },
  })
  return result
}

export const getFacturesByDateRangeModel = async (user_id: string, startDate: string, endDate: string) => {
  const result = await db.execute({
    sql: `
      SELECT f.*, 
      COALESCE(GROUP_CONCAT(p.name || ' (x' || fp.quantity || ')'), '') AS products
      FROM factures AS f
      LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
      LEFT JOIN products AS p ON p.id = fp.product_id
      WHERE f.user_id = :user_id
      AND f.date BETWEEN :startDate AND :endDate
      GROUP BY f.id
      ORDER BY f.date ASC
    `,
    args: { user_id, startDate, endDate },
  })
  return result
}

export const getFacturesByDateRangeAndCompanyIdModel = async (company_id: string, startDate: string, endDate: string) => {
  const result = await db.execute({
    sql: `
      SELECT f.*, 
      COALESCE(GROUP_CONCAT(p.name || ' (x' || fp.quantity || ')'), '') AS products
      FROM factures AS f
      LEFT JOIN facture_products AS fp ON fp.facture_id = f.id
      LEFT JOIN products AS p ON p.id = fp.product_id
      WHERE f.company_id = :company_id
      AND f.date BETWEEN :startDate AND :endDate
      GROUP BY f.id
      ORDER BY f.date ASC
    `,
    args: { company_id, startDate, endDate },
  })
  return result
}

export const postFactureModel = async (user_id: string, company_id: number, total_amount: number, date: string) => {
  console.log('asdsadsa: ', user_id, company_id, total_amount, date)
  const insertResult = await db.execute({
    sql: `
      INSERT INTO factures (user_id, company_id, total_amount, date)
      VALUES (:user_id, :company_id, :total_amount, :date)`,
    args: {
      user_id,
      company_id,
      total_amount,
      date,
    },
  })
  const factureId = insertResult.lastInsertRowid
  const factureResult = await db.execute({
    sql: `
      SELECT * 
      FROM factures
      WHERE id = :id;
    `,
    args: { id: String(factureId) },
  })

  return factureResult.rows[0]
}

export const patchFactureTotalAmountModel = async (id: string, total_amount: number) => {
  const result = await db.execute({
    sql: `UPDATE factures SET total_amount = :total_amount, update_at = CURRENT_TIMESTAMP WHERE id = :id`,
    args: { id, total_amount },
  })
  return result
}

export const deleteFactureModel = async (id: string) => {
  const result = await db.execute({
    sql: `DELETE FROM factures WHERE id = :id`,
    args: { id },
  })
  return result
}
