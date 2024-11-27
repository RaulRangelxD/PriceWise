import db from '../config/database.js'

export const loginUserModel = async (email: string) => {
  const result = await db.execute({ sql: `SELECT * FROM users WHERE email = :email`, args: { email } })
  console.log('model: ', result)
  return result
}
