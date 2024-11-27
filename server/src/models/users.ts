import db from '../config/database.js'

export const getAllUsersModel = async () => {
  const result = await db.execute(`SELECT * FROM users`)
  return result
}

export const getUserByIdModel = async (id: string) => {
  const result = await db.execute({ sql: `SELECT * FROM users WHERE id = :id`, args: { id } })
  return result
}

export const getUserByEmailModel = async (email: string) => {
  const result = await db.execute({ sql: `SELECT * FROM users WHERE email = :email`, args: { email } })
  return result
}

export const createUserModel = async (userId: string, email: string, username: string, password: string) => {
  const result = await db.execute({
    sql: `INSERT INTO users (id, email, username, password) VALUES (:id, :email, :username, :password)`,
    args: { id: userId, email, username, password },
  })
  return result
}

export const updateUserModel = async (email: string, username: string, hashedPassword: string, id: string) => {
  const result = await db.execute({
    sql: `UPDATE users SET email = :email, username = :username, password = :password WHERE id = :id`,
    args: { email, username, password: hashedPassword, id },
  })
  return result
}

export const updateUserVerifiedModel = async (userId: string) => {
  const result = await db.execute({
    sql: `UPDATE users SET verified = TRUE WHERE id = :userId`,
    args: { userId },
  })
  return result
}

export const deleteUserModel = async (id: string) => {
  const result = await db.execute({
    sql: `DELETE FROM users WHERE id = :id`,
    args: { id },
  })
  return result
}
