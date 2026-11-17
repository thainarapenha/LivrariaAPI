import { database } from '../infra/database.js'

const bookColumns = `
  id,
  title,
  author,
  publisher,
  isbn,
  description,
  image_url,
  price,
  stock_quantity
`

export const findActiveBooks = async () => {
  const query = `
    SELECT ${bookColumns}
    FROM books
    WHERE is_active = TRUE
    ORDER BY title ASC
  `

  return database.query(query)
}

export const findActiveBookById = async (id) => {
  const query = `
    SELECT ${bookColumns}
    FROM books
    WHERE id = $1 AND is_active = TRUE
  `

  return database.query(query, [id])
}
