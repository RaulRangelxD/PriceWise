import db from '../config/database.js'

export const getAllProductsModel = async () => {
  const result = await db.execute(`
    SELECT p.*, 
    COALESCE(GROUP_CONCAT(c.name), '') AS categories
    FROM products AS p
    LEFT JOIN product_categories AS pc ON pc.product_id = p.id
    LEFT JOIN categories AS c ON c.id = pc.category_id
    GROUP BY p.id
  `)
  return result
}

export const getAllProductsByUserIdModel = async (user_id: string) => {
  const result = await db.execute({
    sql: `
    SELECT p.*, 
    COALESCE(GROUP_CONCAT(c.name), '') AS categories
    FROM products AS p
    LEFT JOIN product_categories AS pc ON pc.product_id = p.id
    LEFT JOIN categories AS c ON c.id = pc.category_id
    WHERE p.user_id = :user_id
    GROUP BY p.id
  `,
    args: { user_id },
  })
  return result
}

export const getAllProductsByUserIdAndPaginationModel = async (user_id: string, limit: number, offset: number) => {
  const result = await db.execute({
    sql: `
    SELECT p.*, 
    COALESCE(GROUP_CONCAT(c.name), '') AS categories
    FROM products AS p
    LEFT JOIN product_categories AS pc ON pc.product_id = p.id
    LEFT JOIN categories AS c ON c.id = pc.category_id
    WHERE p.user_id = :user_id
    GROUP BY p.id
    ORDER BY update_at
    DESC LIMIT :limit
    OFFSET :offset`,
    args: { user_id, limit, offset },
  })
  return result
}

export const getAllProductsByCompanyIdAndPaginationModel = async (company_id: string, limit: number, offset: number) => {
  const result = await db.execute({
    sql: `
    SELECT p.*, 
    COALESCE(GROUP_CONCAT(c.name), '') AS categories
    FROM products AS p
    LEFT JOIN product_categories AS pc ON pc.product_id = p.id
    LEFT JOIN categories AS c ON c.id = pc.category_id
    WHERE company_id = :company_id
    GROUP BY p.id
    ORDER BY update_at
    DESC LIMIT :limit
    OFFSET :offset`,
    args: { company_id, limit, offset },
  })
  return result
}

export const getProductByIdModel = async (id: string) => {
  const result = await db.execute({
    sql: `SELECT p.*, 
    COALESCE(GROUP_CONCAT(c.name), '') AS categories
    FROM products AS p
    LEFT JOIN product_categories AS pc ON pc.product_id = p.id
    LEFT JOIN categories AS c ON c.id = pc.category_id
    WHERE p.id = :id -- Filter by product id
    GROUP BY p.id
    `,
    args: { id },
  })
  return result
}

export const postProductModel = async (company_id: number, user_id: string, name: string, description: string, price: number, weight: number, weight_unit: string, quantity: number) => {
  const result = await db.execute({
    sql: `INSERT INTO products (company_id, user_id, name, description, price, weight, weight_unit, quantity) VALUES (:company_id, :user_id, :name, :description, :price, :weight, :weight_unit, :quantity)`,
    args: { company_id, user_id, name, description, price, weight, weight_unit, quantity },
  })
  return result
}

export const patchProductModel = async (name: string, description: string, price: number, weight: number, weight_unit: string, quantity: number, id: string) => {
  const result = await db.execute({
    sql: `UPDATE products SET name = :name, description = :description, price = :price, weight = :weight, weight_unit = :weight_unit, quantity = :quantity, update_at = CURRENT_TIMESTAMP WHERE id = :id`,
    args: { name, description, price, weight, weight_unit, quantity, id },
  })
  return result
}

export const deleteProductModel = async (id: string) => {
  const result = await db.execute({
    sql: `DELETE FROM products WHERE id = :id`,
    args: { id },
  })
  return result
}
