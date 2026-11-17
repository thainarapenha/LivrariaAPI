import { Router } from 'express'

import {
  getBookById,
  listBooks,
} from '../controllers/booksController.js'

const booksRouter = Router()

booksRouter.get('/books', listBooks)
booksRouter.get('/books/:id', getBookById)

export { booksRouter }
