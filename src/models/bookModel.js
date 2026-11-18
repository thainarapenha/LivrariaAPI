export default class BookModel {
  constructor({
    titulo: title,
    descricao: description,
    categoria: category,
    url_img: imageUrl,
    preco: price,
    total_paginas: pageCount,
    ano_publicacao: publicationYear,
    autor: author,
  }) {
    this.titulo = title
    this.descricao = description
    this.categoria = category
    this.url_img = imageUrl
    this.preco = price
    this.total_paginas = pageCount
    this.ano_publicacao = publicationYear
    this.autor = author
  }
}
