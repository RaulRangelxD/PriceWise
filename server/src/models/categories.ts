import db from '../config/database.js'

export const getAllCategoriesModel = async () => {
  const result = await db.execute(`SELECT * FROM categories`)
  return result
}

export const getAllCategoriesByUserIdModel = async (user_id: string) => {
  const result = await db.execute({ sql: `SELECT * FROM categories WHERE user_id = :user_id`, args: { user_id } })
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
    sql: `UPDATE categories SET name = :name WHERE id = :id`,
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
