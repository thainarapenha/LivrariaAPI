import {
  findActiveBookById,
  findActiveBooks,
} from '../repositories/booksRepository.js'

const isPositiveInteger = (value) => /^[1-9]\d*$/.test(value)

export const listBooks = async (_request, response) => {
  try {
    const { rows } = await findActiveBooks()

    return response.status(200).json(rows)
  } catch (error) {
    console.error('Failed to list books:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}

export const getBookById = async (request, response) => {
  const { id } = request.params

  if (!isPositiveInteger(id)) {
    return response.status(400).json({ error: 'Invalid book ID' })
  }

  const numericId = Number(id)

  if (!Number.isSafeInteger(numericId) || numericId > 2147483647) {
    return response.status(400).json({ error: 'Invalid book ID' })
  }

  try {
    const { rows } = await findActiveBookById(numericId)

    if (rows.length === 0) {
      return response.status(404).json({ error: 'Book not found' })
    }

    return response.status(200).json(rows[0])
  } catch (error) {
    console.error('Failed to find book:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}
