import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

import { database } from './infra/database.js'
import { registerRoutes } from './routes/routes.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

registerRoutes(app)

const startServer = async () => {
  try {
    await database.query('SELECT 1')

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`)
      console.log('Conexão com PostgreSQL estabelecida.')
    })
  } catch (error) {
    console.error('Não foi possível conectar ao PostgreSQL:', error)
    process.exit(1)
  }
}

startServer()
