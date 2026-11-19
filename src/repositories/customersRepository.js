import { database } from '../infra/database.js'

const customerColumns = `
  id,
  name,
  email,
  created_at,
  updated_at
`

export const findCustomerByEmail = async (email) => {
  const query = `
    SELECT id, name, email, password_hash, created_at, updated_at
    FROM customers
    WHERE LOWER(email) = LOWER($1)
  `

  return database.query(query, [email])
}

export const createCustomer = async ({ name, email, passwordHash }) => {
  const query = `
    INSERT INTO customers (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING ${customerColumns}
  `

  return database.query(query, [name, email, passwordHash])
}

export const findCustomerById = async (id) => {
  const query = `
    SELECT ${customerColumns}
    FROM customers
    WHERE id = $1
  `

  return database.query(query, [id])
}

export const updateCustomerById = async (id, { name, email, passwordHash }) => {
  const query = `
    UPDATE customers
    SET name = $1,
        email = $2,
        password_hash = COALESCE($3, password_hash),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING ${customerColumns}
  `

  return database.query(query, [name, email, passwordHash, id])
}
