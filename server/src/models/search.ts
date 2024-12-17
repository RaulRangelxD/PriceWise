import db from '../config/database.js'

const ALLOWED_TABLES = ['companies', 'products', 'categories']

export const searchInTableModel = async (table: string, keyword: string, user_id: string) => {
  try {
    if (!ALLOWED_TABLES.includes(table)) {
      throw new Error(`Invalid table name: ${table}`)
    }

    const query = `
      SELECT * 
      FROM ${table} 
      WHERE name LIKE ? AND user_id = ? 
      ORDER BY create_at DESC;
    `

    const results = await db.execute({ sql: query, args: [`%${keyword}%`, user_id] })
    return results
  } catch (e) {
    console.error(`Error searching in ${table}:`, e)
    throw e
  }
}
