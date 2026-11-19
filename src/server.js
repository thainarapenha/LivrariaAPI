import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

import { database } from './infra/database.js'
import { registerRoutes } from './routes/routes.js'
import { assertJwtConfiguration } from './services/customersService.js'

const app = express()
const port = Number(process.env.PORT) || 3000
const host = '0.0.0.0'

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)

if (process.env.NODE_ENV === 'production' && allowedOrigins.length === 0) {
  throw new Error('CORS_ORIGIN must be configured in production.')
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Origin not allowed by CORS'))
  },
}))
app.use(express.json())

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' })
})

app.get('/ready', async (_request, response) => {
  try {
    await database.query('SELECT 1')
    return response.status(200).json({ status: 'ready' })
  } catch (_error) {
    return response.status(503).json({ status: 'unavailable' })
  }
})

registerRoutes(app)

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' })
})

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({ error: 'Invalid JSON payload' })
  }

  if (error.message === 'Origin not allowed by CORS') {
    return response.status(403).json({ error: 'Origin not allowed' })
  }

  console.error('Unhandled application error:', error)
  return response.status(500).json({ error: 'Internal server error' })
})

const startServer = async () => {
  try {
    assertJwtConfiguration()
    await database.query('SELECT 1')

    app.listen(port, host, () => {
      console.log(`Server listening on ${host}:${port}`)
      console.log('Conexão com PostgreSQL estabelecida.')
    })
  } catch (error) {
    console.error('Não foi possível conectar ao PostgreSQL:', error)
    process.exit(1)
  }
}

startServer()

export { app }
