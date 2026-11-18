import {
  findActiveBookById,
  findActiveBooks,
} from '../repositories/booksRepository.js'

const isPositiveInteger = (value) => /^[1-9]\d*$/.test(value)

const isValidSlug = slug =>
  typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)

const parseBooleanParameter = (value, parameterName) => {
  if (value === undefined) return { value: undefined }
  if (value === 'true') return { value: true }
  if (value === 'false') return { value: false }

  return { error: `${parameterName} must be true or false` }
}

const parsePriceParameter = (value, parameterName) => {
  if (value === undefined) return { value: undefined }
  if (typeof value !== 'string' || value.trim() === '') {
    return { error: `${parameterName} must be a finite non-negative number` }
  }

  const numericValue = Number(value)
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    return { error: `${parameterName} must be a finite non-negative number` }
  }

  return { value: numericValue }
}

const parseBookFilters = query => {
  const filters = {}

  if (query.categories !== undefined) {
    if (typeof query.categories !== 'string' || query.categories.trim() === '') {
      return { error: 'categories must contain one or more slugs' }
    }

    const categories = query.categories.split(',').map(category => category.trim())
    if (categories.some(category => !category || !isValidSlug(category))) {
      return { error: 'categories must contain valid slugs' }
    }

    if (new Set(categories).size !== categories.length) {
      return { error: 'categories must not contain duplicate slugs' }
    }

    filters.categories = categories
  }

  for (const parameterName of ['minPrice', 'maxPrice']) {
    const result = parsePriceParameter(query[parameterName], parameterName)
    if (result.error) return result
    if (result.value !== undefined) filters[parameterName] = result.value
  }

  if (filters.minPrice !== undefined &&
    filters.maxPrice !== undefined &&
    filters.minPrice > filters.maxPrice) {
    return { error: 'minPrice must not be greater than maxPrice' }
  }

  for (const parameterName of ['preorder', 'newRelease', 'promotion']) {
    const result = parseBooleanParameter(query[parameterName], parameterName)
    if (result.error) return result
    if (result.value !== undefined) filters[parameterName] = result.value
  }

  return { filters }
}

export const listBooks = async (request, response) => {
  const { filters, error: validationError } = parseBookFilters(request.query)

  if (validationError) {
    return response.status(400).json({ error: validationError })
  }

  try {
    const { rows } = await findActiveBooks(filters)

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
