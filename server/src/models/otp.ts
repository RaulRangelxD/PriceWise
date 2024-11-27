import db from '../config/database.js'

export const createOTP = async (userId: string, otp: string, expiresAt: Date, purpose: string) => {
  const result = await db.execute({
    sql: `
      INSERT INTO otps (user_id, otp, expires_at, purpose)
      VALUES (:userId, :otp, :expiresAt, :purpose)
      RETURNING id;
    `,
    args: { userId, otp, expiresAt, purpose },
  })
  return result
}

export const getOTP = async (userId: string, otp: string, purpose: string) => {
  const result = await db.execute({
    sql: `
      SELECT * FROM otps
      WHERE user_id = :userId AND otp = :otp AND purpose = :purpose;
    `,
    args: { userId, otp, purpose },
  })
  return result.rows[0]
}

export const deleteOTP = async (userId: string, purpose: string) => {
  await db.execute({
    sql: `
      DELETE FROM otps
      WHERE user_id = :userId AND purpose = :purpose;
    `,
    args: { userId, purpose },
  })
}
