function validacaoLivro(req, res, next) {
    let { titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor } = req.body;
    if (!titulo) {
      return res.status(400).json({ error: 'Titulo é obrigatório' });
    }
    if (!descricao) {
      return res.status(400).json({ erro: 'Descrição é obrigatória' });
    }
  
    if (!categoria) {
      return res.status(400).json({ erro: 'Categoria é obrigatória' });
    }
    if (!url_img) {
        return res.status(400).json({ erro:'Imagem é obrigatória' });
      }
    if (!preco) {
        return res.status(400).json({ erro:'Preco é obrigatório' });
      }
    if (!total_paginas) {
        return res.status(400).json({ erro:'Total de paginas é obrigatório' });
      }
    if (!ano_publicacao) {
        return res.status(400).json({ erro:'Ano da publicação é obrigatório' });
      }
      if (!autor) {
        return res.status(400).json({ erro:'Autor é obrigatório' });
      }
  
    return next();
  }

  export default validacaoLivro