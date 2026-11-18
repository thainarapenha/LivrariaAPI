import { Router } from 'express'

import {
  createOrder,
  getOrderById,
  listOrders,
} from '../controllers/ordersController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js'

const ordersRouter = Router()

ordersRouter.post('/orders', authenticateToken, createOrder)
ordersRouter.get('/orders', authenticateToken, listOrders)
ordersRouter.get('/orders/:id', authenticateToken, getOrderById)

export { ordersRouter }
