export default class LivroDAO {

    //metodos
    static listarLivros(bd) {
      return new Promise((resolve, reject) => {
        bd.all('SELECT * FROM livros', (erro, linhas) => {
          if (erro) {
            console.log(erro);
            reject(erro);
          } else {
            resolve(linhas);
          }
        });
      });
    }

    static listarLivrosPorId(bd, id_livro) {
        return new Promise((resolve, reject) => {
          bd.all('SELECT * FROM livros WHERE id_livro = ?',[id_livro],(erro, linhas) => {
            if (erro) {
              console.log(erro);
              reject(erro);
            } else {
              resolve(linhas);
            }
          });
        });
      }

      static adicionarLivros(bd, livro) {
        const { titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor} = livro;

        return new Promise((resolve, reject) => {
          bd.run(

          'INSERT INTO livros ( titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor], //params
            erro => {
            if (erro) {
            
             return resolve("Livro cadastrado com sucesso")
            } else {
              return reject(erro);
            }
          });
        });
      }





}