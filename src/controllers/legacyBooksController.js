import BooksDao from '../daos/booksDao.js'
import BookModel from '../models/bookModel.js'

const listLegacyBooks = async (_request, response) => {
  try {
    const { rows: books } = await BooksDao.listBooks()
    response.json(books)
  }
  catch (error) { response.status(400).json({ error }) }
}
const getLegacyBookById = async (request, response) => {
  try {
    const { rows: book } = await BooksDao.findBookById(request.params.id)
    if (!book.length) return response.status(400).json({ message: 'Livro não encontrado' })
    response.json(book)
  } catch (error) { response.status(400).json({ error: error.message }) }
}
const createLegacyBook = async (request, response) => {
  const book = new BookModel(request.body)
  try {
    await BooksDao.createBook(book)
    response.status(201).json(book)
  }
  catch (error) { response.status(400).json({ error: error.message }) }
}
const updateLegacyBook = async (request, response) => {
  const { id } = request.params
  const book = new BookModel(request.body)
  try {
    const { rows: existingBook } = await BooksDao.findBookById(id)
    if (!existingBook.length) return response.status(404).json({ erro: 'Livro não existe' })
    await BooksDao.updateBook(id, book)
    response.status(200).json({ message: 'Livro atualizado com sucesso' })
  } catch (error) { response.status(400).json({ error: error.message }) }
}
const deleteLegacyBook = async (request, response) => {
  const { id } = request.params
  try {
    const { rows: existingBook } = await BooksDao.findBookById(id)
    if (!existingBook.length) return response.status(404).json({ erro: 'Livro não existe' })
    await BooksDao.deleteBook(id)
    response.status(200).json({ message: 'Livro deletado com sucesso' })
  } catch (error) { response.status(400).json({ error: error.message }) }
}
export default { listLegacyBooks, getLegacyBookById, createLegacyBook, updateLegacyBook, deleteLegacyBook }
