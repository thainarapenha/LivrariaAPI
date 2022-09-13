export default class LivrosModel {
  constructor({
    titulo,
    descricao,
    categoria,
    url_img,
    preco,
    total_paginas,
    ano_publicacao,
    autor,
  }) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.categoria = categoria;
    this.url_img = url_img;
    this.preco = preco;
    this.total_paginas = total_paginas;
    this.ano_publicacao = ano_publicacao;
    this.autor = autor;
  }
}
