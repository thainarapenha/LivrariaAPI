import {
  BookNotFoundError,
  createCustomerOrder,
  getCustomerOrder,
  InsufficientStockError,
  listCustomerOrders,
  OrderValidationError,
} from '../services/ordersService.js'

const isPositiveOrderId = (value) => /^[1-9]\d*$/.test(value)

export const createOrder = async (request, response) => {
  try {
    const order = await createCustomerOrder(
      request.authenticatedCustomerId,
      request.body,
    )

    return response.status(201).json(order)
  } catch (error) {
    if (error instanceof OrderValidationError) {
      return response.status(400).json({ error: error.message })
    }

    if (error instanceof BookNotFoundError) {
      return response.status(404).json({ error: 'Book not found' })
    }

    if (error instanceof InsufficientStockError) {
      return response.status(409).json({ error: 'Insufficient stock' })
    }

    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const listOrders = async (request, response) => {
  try {
    const orders = await listCustomerOrders(request.authenticatedCustomerId)

    return response.status(200).json(orders)
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const getOrderById = async (request, response) => {
  const { id } = request.params

  if (!isPositiveOrderId(id)) {
    return response.status(400).json({ error: 'Invalid order ID' })
  }

  const orderId = Number(id)

  if (!Number.isSafeInteger(orderId) || orderId > 2147483647) {
    return response.status(400).json({ error: 'Invalid order ID' })
  }

  try {
    const order = await getCustomerOrder(
      request.authenticatedCustomerId,
      orderId,
    )

    if (!order) {
      return response.status(404).json({ error: 'Order not found' })
    }

    return response.status(200).json(order)
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' })
  }
}
