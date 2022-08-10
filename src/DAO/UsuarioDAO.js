export default class UsuarioDAO {
  static listarUsuarios(bd) {
    return new Promise((resolve, reject) => {
      bd.all('SELECT * FROM usuarios', (erro, linhas) => {
        if (erro) {
          console.log(erro);
          reject(erro);
        } else {
          resolve(linhas);
        }
      });
    });
  }

  static listarUsuariosPorId(bd, id) {
    return new Promise((resolve, reject) => {
      bd.get('SELECT * FROM usuarios WHERE id = ?', [id], (erro, linhas) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(linhas);
        }
      });
    });
  }

  /**
   * @param {Database} bd - Instância do banco de dados.
   * @param {Object} usuario - Objeto com dados do usuário
   * @returns {Promise} - Promise com o resultado da inserção
   */
  static adicionarUsuario(bd, usuario) {
    const { nome, email, senha, CPF } = usuario;

    return new Promise((resolve, reject) => {
      bd.run(
        'INSERT INTO usuarios (nome, email, senha, CPF) VALUES (?, ?, ?, ?)',
        [nome, email, senha, CPF],
        erro => {
          if (!erro) {
            resolve('Usuário adicionado com sucesso!');
          }

          if (erro.message.includes('UNIQUE constraint failed')) {
            if (erro.message.includes('email')) {
              reject('E-mail já cadastrado!');
            } else if (erro.message.includes('CPF')) {
              reject('CPF já cadastrado!');
            }
          }

          reject(erro);
        }
      );
    });
  }

  /**
   *
   * @param {Database} bd - Instância do banco de dados.
   * @param {Request.params.id} id - ID do usuário a ser atualizado.
   * @param {Object} usuarioAtualizado - Objeto com dados do usuário atualizado.
   * @returns {Promise} - Promise com o resultado da atualização.
   */
  static atualizarUsuario(bd, id, usuarioAtualizado) {
    const { nome, email, senha, CPF } = usuarioAtualizado;

    return new Promise((resolve, reject) => {
      bd.run(
        'UPDATE usuarios SET nome = ?, email = ?, senha = ?, CPF = ? WHERE id = ?',
        [nome, email, senha, CPF, id],
        erro => {
          if (erro) {
            reject(erro);
          } else {
            resolve('Usuário atualizado com sucesso!');
          }
        }
      );
    });
  }

  static deletarUsuario(bd, id) {
    return new Promise((resolve, reject) => {
      bd.run('DELETE FROM usuarios WHERE id = ?', [id], erro => {
        if (erro) {
          reject(erro);
        } else {
          resolve('Usuário deletado com sucesso!');
        }
      });
    });
  }
}
