import { Router } from 'express'
import BooksController from '../controllers/legacyBooksController.js'
import validateBook from '../middlewares/bookValidation.js'

const legacyBooksRouter = Router()
legacyBooksRouter.get('/livros', BooksController.listLegacyBooks)
legacyBooksRouter.get('/livros/:id', BooksController.getLegacyBookById)
legacyBooksRouter.post('/livros', validateBook, BooksController.createLegacyBook)
legacyBooksRouter.patch('/livros/:id', validateBook, BooksController.updateLegacyBook)
legacyBooksRouter.delete('/livros/:id', BooksController.deleteLegacyBook)
export { legacyBooksRouter }
