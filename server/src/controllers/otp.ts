import crypto from 'crypto'
import { getOTP, createOTP, deleteOTP } from '../models/otp.js'
import { getUserByEmailModel, updateUserVerifiedModel } from '../models/users.js'
import { sendEmail } from '../utils/email.js'
import { defaultResponse } from '../utils/defaultRes.js'
import { Request, Response } from 'express'

export const sendOTP = async (req: Request, res: Response) => {
  const { email, purpose } = req.body

  if (!email || !purpose) {
    return defaultResponse({ res, status: 400, message: 'Email and purpose are required' })
  }

  try {
    const { rows } = await getUserByEmailModel(email)
    if (!rows || rows.length === 0) {
      return defaultResponse({ res, status: 404, message: 'User not found' })
    }

    const userId = rows[0].id
    if (!userId || typeof userId !== 'string') {
      return defaultResponse({ res, status: 500, message: 'Invalid user format', data: null })
    }

    const otp = crypto.randomInt(100000, 999999).toString()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

    await deleteOTP(userId, purpose)

    await createOTP(userId, otp, expiresAt, purpose)

    await sendEmail(email, `Your one time password for ${purpose} in `, `Your OTP is: ${otp}`)
    defaultResponse({ res, status: 200, message: 'OTP sent to email' })
  } catch (error) {
    console.error('Error sending OTP:', error)
    defaultResponse({ res, status: 500, message: 'Error sending OTP' })
  }
}

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp, purpose } = req.body

  if (!email || !otp || !purpose) {
    return defaultResponse({ res, status: 400, message: 'Email, OTP, and purpose are required' })
  }

  try {
    const { rows } = await getUserByEmailModel(email)
    if (!rows || rows.length === 0) {
      return defaultResponse({ res, status: 404, message: 'User not found' })
    }

    const userId = rows[0].id
    if (!userId || typeof userId !== 'string') {
      return defaultResponse({ res, status: 500, message: 'Invalid user format', data: null })
    }

    const storedOTP = await getOTP(userId, otp, purpose)

    if (!storedOTP) {
      return defaultResponse({ res, status: 400, message: 'Invalid OTP or OTP does not exist' })
    }

    const currentTime = new Date()

    if (!storedOTP.expires_at) {
      return defaultResponse({ res, status: 400, message: 'OTP expiration time is missing' })
    }

    const expiresAt = typeof storedOTP.expires_at === 'string' || typeof storedOTP.expires_at === 'number' ? new Date(storedOTP.expires_at) : null

    if (!expiresAt || isNaN(expiresAt.getTime())) {
      return defaultResponse({ res, status: 400, message: 'Invalid expiration time for OTP' })
    }

    if (expiresAt < currentTime) {
      await deleteOTP(userId, purpose)
      return defaultResponse({ res, status: 400, message: 'Expired OTP' })
    }

    await deleteOTP(userId, purpose)

    if (purpose === 'email_verification') {
      const result = await updateUserVerifiedModel(userId)
    }

    defaultResponse({ res, status: 200, message: 'OTP verified successfully' })
  } catch (error) {
    console.error('Error verifying OTP:', error)
    defaultResponse({ res, status: 500, message: 'Error verifying OTP' })
  }
}
