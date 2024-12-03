import { Router } from 'express'
import { getAllUsers, getUserById, getUserByEmail, postUser, patchUser, patchPassword, deleteUser } from '../controllers/users.js'

export const usersRouter = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/id/:id', getUserById)
usersRouter.get('/email', getUserByEmail)

usersRouter.post('/', postUser)

usersRouter.patch('/update/:id', patchUser)
usersRouter.patch('/password/:id', patchPassword)

usersRouter.delete('/:id', deleteUser)
