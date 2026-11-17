import { database } from '../infra/database.js'

import {
  createOrder,
  createOrderItem,
  decreaseBookStock,
  findBooksForUpdate,
  findOrderByIdAndCustomerId,
  findOrderItemsByOrderId,
  findOrdersByCustomerId,
} from '../repositories/ordersRepository.js'

const maximumPostgresInteger = 2147483647
const maximumNumericCents = 9999999999n
const integerPattern = /^[1-9]\d*$/
const moneyPattern = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/

export class OrderValidationError extends Error {}

export class BookNotFoundError extends Error {}

export class InsufficientStockError extends Error {}

const isPositiveInteger = (value) => {
  if (typeof value === 'number') {
    return Number.isSafeInteger(value) && value > 0 && value <= maximumPostgresInteger
  }

  return typeof value === 'string' && integerPattern.test(value)
    && Number(value) <= maximumPostgresInteger
}

const parseMoneyToCents = (value) => {
  const normalizedValue = String(value)

  if (!moneyPattern.test(normalizedValue)) {
    throw new Error('Invalid monetary value returned by database.')
  }

  const [whole, fraction = ''] = normalizedValue.split('.')
  const cents = BigInt(`${whole}${fraction.padEnd(2, '0')}`)

  if (cents > maximumNumericCents) {
    throw new Error('Monetary value exceeds the order limit.')
  }

  return cents
}

const centsToMoney = (cents) => {
  if (cents > maximumNumericCents) {
    throw new Error('Order total exceeds the database limit.')
  }

  const whole = cents / 100n
  const fraction = String(cents % 100n).padStart(2, '0')

  return `${whole}.${fraction}`
}

const validateCheckoutItems = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new OrderValidationError('Items must be a non-empty array.')
  }

  const bookIds = new Set()
  const validatedItems = items.map((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new OrderValidationError('Each item must be an object.')
    }

    if (!isPositiveInteger(item.book_id) || !isPositiveInteger(item.quantity)) {
      throw new OrderValidationError(
        'Book ID and quantity must be positive integers.',
      )
    }

    const bookId = Number(item.book_id)
    const quantity = Number(item.quantity)

    if (bookIds.has(bookId)) {
      throw new OrderValidationError('Duplicate books are not allowed.')
    }

    bookIds.add(bookId)

    return { bookId, quantity }
  })

  return { bookIds: [...bookIds].sort((first, second) => first - second), validatedItems }
}

export const createCustomerOrder = async (customerId, input) => {
  if (!isPositiveInteger(customerId)) {
    throw new OrderValidationError('Invalid authenticated customer.')
  }

  const { bookIds, validatedItems } = validateCheckoutItems(input?.items)
  const client = await database.connect()
  let transactionStarted = false

  try {
    await client.query('BEGIN')
    transactionStarted = true

    const { rows: books } = await findBooksForUpdate(client, bookIds)
    const booksById = new Map(books.map((book) => [book.id, book]))

    if (booksById.size !== bookIds.length) {
      throw new BookNotFoundError('One or more books do not exist or are inactive.')
    }

    const calculatedItems = validatedItems.map(({ bookId, quantity }) => {
      const book = booksById.get(bookId)
      const priceInCents = parseMoneyToCents(book.price)
      const subtotalInCents = priceInCents * BigInt(quantity)

      if (Number(book.stock_quantity) < quantity) {
        throw new InsufficientStockError('Insufficient stock for one or more books.')
      }

      return {
        bookId,
        bookTitle: book.title,
        unitPrice: centsToMoney(priceInCents),
        quantity,
        subtotal: centsToMoney(subtotalInCents),
        subtotalInCents,
      }
    })

    const totalInCents = calculatedItems.reduce(
      (total, item) => total + item.subtotalInCents,
      0n,
    )
    const { rows: orderRows } = await createOrder(
      client,
      Number(customerId),
      centsToMoney(totalInCents),
    )
    const order = orderRows[0]
    const orderItems = []

    for (const item of calculatedItems) {
      const { rows: stockRows } = await decreaseBookStock(
        client,
        item.bookId,
        item.quantity,
      )

      if (stockRows.length === 0) {
        throw new InsufficientStockError('Insufficient stock for one or more books.')
      }

      const { rows: itemRows } = await createOrderItem(client, {
        orderId: order.id,
        bookId: item.bookId,
        bookTitle: item.bookTitle,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })
      orderItems.push(itemRows[0])
    }

    await client.query('COMMIT')

    return { ...order, items: orderItems }
  } catch (error) {
    if (transactionStarted) {
      await client.query('ROLLBACK').catch(() => {})
    }

    throw error
  } finally {
    client.release()
  }
}

export const listCustomerOrders = async (customerId) => {
  const { rows } = await findOrdersByCustomerId(customerId)

  return rows
}

export const getCustomerOrder = async (customerId, orderId) => {
  const { rows: orderRows } = await findOrderByIdAndCustomerId(orderId, customerId)

  if (orderRows.length === 0) {
    return null
  }

  const { rows: itemRows } = await findOrderItemsByOrderId(orderId)

  return { ...orderRows[0], items: itemRows }
}
