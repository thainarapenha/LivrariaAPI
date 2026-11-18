import { database } from '../infra/database.js'

export default class BooksDao {
  static listBooks() {
    return database.query('SELECT * FROM livros')
  }

  static findBookById(id) {
    return database.query('SELECT * FROM livros WHERE id_livro = $1', [id])
  }

  static createBook(bookData) {
    const query =
      'INSERT INTO livros (titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'

    return database.query(query, Object.values(bookData))
  }

  static updateBook(id, bookData) {
    const query =
      'UPDATE livros SET titulo = $1, descricao = $2, categoria = $3, url_img = $4, preco = $5, total_paginas = $6, ano_publicacao = $7, autor = $8 WHERE id_livro = $9'

    return database.query(query, [...Object.values(bookData), id])
  }

  static deleteBook(id) {
    return database.query('DELETE FROM livros WHERE id_livro = $1', [id])
  }
}
