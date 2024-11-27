import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getAllUsersModel, getUserByIdModel, getUserByEmailModel, createUserModel, updateUserModel, deleteUserModel } from '../models/users.js'
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
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  const userId = uuidv4()

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await createUserModel(userId, email, username, hashedPassword)
    defaultResponse({ res, status: 201, message: 'User created successfully' })
  } catch (e) {
    console.log('Error creating user in database', e)
    defaultResponse({ res, status: 500, message: 'Error creating user' })
  }
}

export const patchUser = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    defaultResponse({ res, status: 400, message: 'Missing required fields' })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await updateUserModel(email, username, hashedPassword, id)
    defaultResponse({ res, status: 200, message: 'User updated successfully' })
  } catch (e) {
    console.log('Error updating user in database', e)
    defaultResponse({ res, status: 500, message: 'Error updating user' })
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
