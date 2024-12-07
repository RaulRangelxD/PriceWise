import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getAllUsersModel, getUserByIdModel, getUserByEmailModel, createUserModel, updateUserModel, updateUserPasswordModel, deleteUserModel } from '../models/users.js'
import { defaultResponse } from '../utils/defaultRes.js'
import { Request, Response } from 'express'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersModel()
    defaultResponse({ res, status: 200, message: 'Users retrieved successfully', data: result.rows })
  } catch (e) {
    console.log('Error retrieving users from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving users' })
  }
}

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  try {
    const result = await getUserByIdModel(id)
    defaultResponse({ res, status: 200, message: 'User retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving user by ID from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving user' })
  }
}

export const getUserByEmail = async (req: Request, res: Response) => {
  const token = req.cookies.auth

  if (!token) {
    defaultResponse({ res, status: 401, message: 'Authentication token missing' })
    return
  }

  const decodedToken = jwt.decode(token) as { email: string } | null

  if (!decodedToken || !decodedToken.email) {
    defaultResponse({ res, status: 401, message: 'Invalid authentication token' })
    return
  }

  const email = decodedToken.email

  try {
    const result = await getUserByEmailModel(email)
    defaultResponse({ res, status: 200, message: 'User retrieved successfully', data: result.rows[0] })
  } catch (e) {
    console.log('Error retrieving user by email from database', e)
    defaultResponse({ res, status: 500, message: 'Error retrieving user' })
  }
}

export const postUser = async (req: Request, res: Response) => {
  const { email, username, firstName, lastName, password } = req.body

  if (!email || !username || !firstName || !lastName || !password) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  const userId = uuidv4()

  const hashedPassword = await bcrypt.hash(password, 10)

  const createAt = new Date().toISOString().split('T')[0]

  try {
    await createUserModel(userId, email, username, firstName, lastName, hashedPassword, createAt)
    defaultResponse({ res, status: 201, message: 'User create successfully' })
  } catch (e) {
    console.log('Error creating user in database', e)
    defaultResponse({ res, status: 500, message: 'Error creating user' })
  }
}

export const patchUser = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const { username, firstName, lastName, bio = '', status = '' } = req.body

  if (!username || !firstName || !lastName) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  const updateAt = new Date().toISOString().split('T')[0]

  try {
    await updateUserModel(username, firstName, lastName, bio, status, updateAt, id)
    defaultResponse({ res, status: 200, message: 'User updated successfully' })
  } catch (e) {
    console.log('Error updating user in database', e)
    defaultResponse({ res, status: 500, message: 'Error updating user' })
  }
}

export const patchPassword = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const { newPassword } = req.body

  if (!newPassword) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  try {
    await updateUserPasswordModel(hashedPassword, id)
    defaultResponse({ res, status: 200, message: 'Password updated successfully' })
  } catch (e) {
    console.log('Error updating Password in database', e)
    defaultResponse({ res, status: 500, message: 'Error updating Password' })
  }
}

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  try {
    await deleteUserModel(id)
    defaultResponse({ res, status: 200, message: 'User deleted successfully' })
  } catch (e) {
    console.log('Error deleting user in database', e)
    defaultResponse({ res, status: 500, message: 'Error deleting user' })
  }
}
