import 'dotenv/config'
import pkg from 'pg'

const { Pool } = pkg

if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI não foi definida no ambiente.')
}

export const database = new Pool({
  connectionString: process.env.DATABASE_URI,
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
  ...(process.env.NODE_ENV === 'production'
    ? { ssl: { rejectUnauthorized: false } }
    : {}),
})

database.on('error', (error) => {
  console.error('Erro inesperado na conexão com PostgreSQL:', error)
})
