import { Router } from 'express'

import {
  getCurrentCustomer,
  login,
  register,
  updateCurrentCustomer,
} from '../controllers/customersController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

const customersRouter = Router()

customersRouter.post('/customers/register', register)
customersRouter.post('/customers/login', login)
customersRouter.get('/customers/me', authenticateToken, getCurrentCustomer)
customersRouter.patch('/customers/me', authenticateToken, updateCurrentCustomer)

export { customersRouter }
