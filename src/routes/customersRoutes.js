import { Router } from 'express'

import {
  getCurrentCustomer,
  login,
  register,
} from '../controllers/customersController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

const customersRouter = Router()

customersRouter.post('/customers/register', register)
customersRouter.post('/customers/login', login)
customersRouter.get('/customers/me', authenticateToken, getCurrentCustomer)

export { customersRouter }
