import { Router } from 'express'
import { getAllUsers, getUserById, getUserByEmail, postUser, patchUser, deleteUser } from '../controllers/users.js'

const router = Router()

router.get('/', getAllUsers)
router.get('/id/:id', getUserById)
router.get('/email', getUserByEmail)

router.post('/', postUser)

router.patch('/:id', patchUser)

router.delete('/:id', deleteUser)

export default router
