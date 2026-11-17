import { database } from '../infra/database.js'

const orderColumns = `
  id,
  customer_id,
  status,
  total_amount,
  created_at,
  updated_at
`

const orderItemColumns = `
  id,
  order_id,
  book_id,
  book_title,
  unit_price,
  quantity,
  subtotal,
  created_at
`

export const findBooksForUpdate = async (client, bookIds) => {
  const query = `
    SELECT id, title, price, stock_quantity, is_active
    FROM books
    WHERE id = ANY($1::integer[]) AND is_active = TRUE
    ORDER BY id ASC
    FOR UPDATE
  `

  return client.query(query, [bookIds])
}

export const createOrder = async (client, customerId, totalAmount) => {
  const query = `
    INSERT INTO orders (customer_id, status, total_amount)
    VALUES ($1, 'confirmed', $2)
    RETURNING ${orderColumns}
  `

  return client.query(query, [customerId, totalAmount])
}

export const createOrderItem = async (client, item) => {
  const query = `
    INSERT INTO order_items
      (order_id, book_id, book_title, unit_price, quantity, subtotal)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING ${orderItemColumns}
  `

  const parameters = [
    item.orderId,
    item.bookId,
    item.bookTitle,
    item.unitPrice,
    item.quantity,
    item.subtotal,
  ]

  return client.query(query, parameters)
}

export const decreaseBookStock = async (client, bookId, quantity) => {
  const query = `
    UPDATE books
    SET stock_quantity = stock_quantity - $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND stock_quantity >= $1
    RETURNING id, stock_quantity
  `

  return client.query(query, [quantity, bookId])
}

export const findOrdersByCustomerId = async (customerId) => {
  const query = `
    SELECT id, status, total_amount, created_at
    FROM orders
    WHERE customer_id = $1
    ORDER BY created_at DESC, id DESC
  `

  return database.query(query, [customerId])
}

export const findOrderByIdAndCustomerId = async (orderId, customerId) => {
  const query = `
    SELECT id, status, total_amount, created_at, updated_at
    FROM orders
    WHERE id = $1 AND customer_id = $2
  `

  return database.query(query, [orderId, customerId])
}

export const findOrderItemsByOrderId = async (orderId) => {
  const query = `
    SELECT ${orderItemColumns}
    FROM order_items
    WHERE order_id = $1
    ORDER BY id ASC
  `

  return database.query(query, [orderId])
}
