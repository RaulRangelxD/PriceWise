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

export const createUserModel = async (id: string, email: string, username: string, first_name: string, last_name: string, password: string, create_at: string) => {
  const result = await db.execute({
    sql: `INSERT INTO users (id, email, username, first_name, last_name, password, create_at) VALUES (:id, :email, :username, :first_name, :last_name, :password, :create_at)`,
    args: { id, email, username, first_name, last_name, password, create_at },
  })
  return result
}

export const updateUserModel = async (username: string, first_name: string, last_name: string, bio: string, status: string, update_at: string, id: string) => {
  const result = await db.execute({
    sql: `UPDATE users SET username = :username, first_name = :first_name, last_name = :last_name, bio = :bio, status = :status, update_at = :update_at WHERE id = :id`,
    args: { username, first_name, last_name, bio, status, update_at, id },
  })
  return result
}

export const updateUserPasswordModel = async (password: string, id: string) => {
  const result = await db.execute({
    sql: `UPDATE users SET password = :password WHERE id = :id`,
    args: { password, id },
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
