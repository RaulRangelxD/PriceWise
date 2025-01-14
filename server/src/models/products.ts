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

export const getAllProductsByCompanyIdModel = async (company_id: string) => {
  const result = await db.execute({
    sql: `
    SELECT p.*, 
    COALESCE(GROUP_CONCAT(c.name), '') AS categories
    FROM products AS p
    LEFT JOIN product_categories AS pc ON pc.product_id = p.id
    LEFT JOIN categories AS c ON c.id = pc.category_id
    WHERE p.company_id = :company_id
    GROUP BY p.id
  `,
    args: { company_id },
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
    ORDER BY update_at DESC
    LIMIT :limit
    OFFSET :offset`,
    args: { company_id, limit, offset },
  })
  return result
}

export const getAllProductsByCategoryIdAndPaginationModel = async (category_id: string, limit: number, offset: number) => {
  const result = await db.execute({
    sql: `
      SELECT p.*, 
      COALESCE(GROUP_CONCAT(c.name), '') AS categories
      FROM products AS p
      LEFT JOIN product_categories AS pc ON pc.product_id = p.id
      LEFT JOIN categories AS c ON c.id = pc.category_id
      WHERE pc.category_id = :category_id
      GROUP BY p.id
      ORDER BY p.update_at DESC
      LIMIT :limit OFFSET :offset`,
    args: { category_id, limit, offset },
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

export const postProductModel = async (companyId: number, userId: string, name: string, description: string, price: number, weight: number, weightUnit: string, quantity: number) => {
  const insertResult = await db.execute({
    sql: `
      INSERT INTO products (company_id, user_id, name, description, price, weight, weight_unit, quantity, create_at, update_at)
      VALUES (:companyId, :userId, :name, :description, :price, :weight, :weightUnit, :quantity, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `,
    args: { companyId, userId, name, description, price, weight, weightUnit, quantity },
  })

  const productId = insertResult.lastInsertRowid
  const productResult = await db.execute({
    sql: `
      SELECT * 
      FROM products
      WHERE id = :id;
    `,
    args: { id: String(productId) },
  })

  return productResult.rows[0]
}

export const patchProductModel = async (name: string, description: string, price: number, weight: number, weight_unit: string, quantity: number, id: string) => {
  const result = await db.execute({
    sql: `UPDATE products SET name = :name, description = :description, price = :price , weight = :weight, weight_unit = :weight_unit, quantity = :quantity, update_at = CURRENT_TIMESTAMP WHERE id = :id`,
    args: { name, description, price, weight, weight_unit, quantity, id },
  })

  const productResult = await db.execute({
    sql: `
      SELECT * 
      FROM products
      WHERE id = :id;
    `,
    args: { id },
  })

  return productResult.rows[0]
}

export const deleteProductModel = async (id: string) => {
  const result = await db.execute({
    sql: `DELETE FROM products WHERE id = :id`,
    args: { id },
  })
  return result
}
