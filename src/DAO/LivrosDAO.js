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
          bd.get('SELECT * FROM livros WHERE id_livro = ?',[id_livro],(erro, linhas) => {
            if (!erro) {
              resolve(linhas);
            } else {
              reject(erro);
            }
          });
        });
      }

      static adicionarLivros(bd, livro) {
        const {titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor} = livro;

        return new Promise((resolve, reject) => {
          bd.run(
          'INSERT INTO livros (titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor], //params
            erro => {
            if (!erro) {
             return resolve("Livro cadastrado com sucesso")
            } else {
              return reject(erro.message);
            }
          });
        });
      }

      static atualizarLivro(bd, id_livro, livroAtualizado) {
        const { titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor} = livroAtualizado;
        return new Promise((resolve, reject) => {
          bd.run(
            'UPDATE livros SET titulo = ?, descricao = ?, categoria = ?, url_img = ?, preco = ?, total_paginas = ?, ano_publicacao = ?, autor = ? WHERE id_livro = ?',
            [titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor, id_livro],
            erro => {
              if (erro) {
                reject(erro.message);
              } else {
                resolve('Usuário atualizado com sucesso!');
              }
            }
          );
        });
      }
    




}