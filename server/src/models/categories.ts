import db from '../config/database.js'

export const getAllCategoriesModel = async () => {
  const result = await db.execute(`SELECT * FROM categories`)
  return result
}

export const getAllCategoriesByUserIdModel = async (user_id: string) => {
  const result = await db.execute({ sql: `SELECT * FROM categories WHERE user_id = :user_id`, args: { user_id } })
  return result
}

export const getAllCategoriesByUserIdAndNotInProductIdModel = async (user_id: string, product_id: string) => {
  console.log(user_id, product_id)
  const result = await db.execute({
    sql: `
      SELECT * 
      FROM categories 
      WHERE user_id = :user_id 
      AND id NOT IN (
        SELECT category_id 
        FROM product_categories 
        WHERE product_id = :product_id
      )
    `,
    args: { user_id, product_id },
  })
  return result
}

export const getAllCategoriesInProductIdModel = async (product_id: string) => {
  const result = await db.execute({
    sql: `
      SELECT * 
      FROM categories 
      WHERE id IN (
        SELECT category_id 
        FROM product_categories 
        WHERE product_id = :product_id
      )
    `,
    args: { product_id },
  })
  return result
}

export const getAllCategoriesByUserIdAndPaginationModel = async (user_id: string, limit: number, offset: number) => {
  const result = await db.execute({ sql: `SELECT * FROM categories WHERE user_id = :user_id ORDER BY update_at DESC LIMIT :limit OFFSET :offset`, args: { user_id, limit, offset } })
  return result
}

export const getCategoryByIdModel = async (id: string) => {
  const result = await db.execute({ sql: `SELECT * FROM categories WHERE id = :id`, args: { id } })
  return result
}

export const postCategoryModel = async (user_id: string, name: string) => {
  const result = await db.execute({
    sql: `INSERT INTO categories (user_id, name) VALUES (:user_id , :name)`,
    args: { user_id, name },
  })
  return result
}

export const patchCategoryModel = async (name: string, id: string) => {
  const result = await db.execute({
    sql: `UPDATE categories SET name = :name, update_at = CURRENT_TIMESTAMP WHERE id = :id`,
    args: { name, id },
  })
  return result
}

export const deleteCategoryModel = async (id: string) => {
  const result = await db.execute({
    sql: `DELETE FROM categories WHERE id = :id`,
    args: { id },
  })
  return result
}
