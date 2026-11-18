import { Router } from 'express'
import UsersController from '../controllers/usersController.js'
import { validateUser, checkUserExists } from '../middlewares/userValidation.js'

const usersRouter = Router()
usersRouter.get('/usuarios', UsersController.listUsers)
usersRouter.get('/usuarios/:id', UsersController.getUserById)
usersRouter.post('/usuarios/registrar', checkUserExists, validateUser, UsersController.registerUser)
usersRouter.post('/usuarios/login', UsersController.loginUser)
usersRouter.patch('/usuarios/:id', validateUser, UsersController.updateUser)
usersRouter.delete('/usuarios/:id', UsersController.deleteUser)
export { usersRouter }
