import db from '../config/database.js'

export const getAllFactureProductsModel = async () => {
  const result = await db.execute(`
    SELECT fp.*, 
           p.name AS product_name, 
           p.description AS product_description, 
           p.price AS product_price, 
           p.weight AS product_weight, 
           p.weight_unit AS product_weight_unit
    FROM facture_products AS fp
    LEFT JOIN products AS p ON fp.product_id = p.id
    ORDER BY fp.create_at DESC
  `)
  return result
}

export const getFactureProductsByFactureIdModel = async (facture_id: string) => {
  const result = await db.execute({
    sql: `
      SELECT fp.*, 
             p.name AS product_name, 
             p.description AS product_description, 
             p.price AS product_price, 
             p.weight AS product_weight, 
             p.weight_unit AS product_weight_unit
      FROM facture_products AS fp
      LEFT JOIN products AS p ON fp.product_id = p.id
      WHERE fp.facture_id = :facture_id
      ORDER BY fp.create_at DESC
    `,
    args: { facture_id },
  })
  return result
}

export const getAllFactureProductsByFactureIdAndPaginationModel = async (facture_id: string, limit: number, offset: number) => {
  const result = await db.execute({
    sql: `
      SELECT fp.*, 
             p.name AS product_name, 
             p.description AS product_description, 
             p.price AS product_price, 
             p.weight AS product_weight, 
             p.weight_unit AS product_weight_unit
      FROM facture_products AS fp
      LEFT JOIN products AS p ON fp.product_id = p.id
      WHERE fp.facture_id = :facture_id
      ORDER BY fp.create_at DESC
      LIMIT :limit OFFSET :offset
    `,
    args: { facture_id, limit, offset },
  })
  return result
}

export const getFactureProductsByProductIdModel = async (product_id: string) => {
  const result = await db.execute({
    sql: `
      SELECT fp.*, 
             p.name AS product_name, 
             p.description AS product_description, 
             p.price AS product_price, 
             p.weight AS product_weight, 
             p.weight_unit AS product_weight_unit
      FROM facture_products AS fp
      LEFT JOIN products AS p ON fp.product_id = p.id
      WHERE fp.product_id = :product_id
      ORDER BY fp.create_at DESC
    `,
    args: { product_id },
  })
  return result
}

export const postFactureProductModel = async (facture_id: string, product_id: string, quantity: number, total_price: number) => {
  const result = await db.execute({
    sql: `INSERT INTO facture_products (facture_id, product_id, quantity, total_price) VALUES (:facture_id, :product_id, :quantity, :total_price)`,
    args: { facture_id, product_id, quantity, total_price },
  })
  return result
}

export const deleteFactureProductModel = async (id: string) => {
  const result = await db.execute({
    sql: `DELETE FROM facture_products WHERE id = :id`,
    args: { id },
  })
  return result
}
