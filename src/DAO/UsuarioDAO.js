export default class UsuarioDAO {
  static listarUsuarios(bd) {
    return new Promise((resolve, reject) => {
      bd.query('SELECT * FROM usuarios', (erro, linhas) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(linhas);
        }
      });
    });
  }

  static listarUsuariosPorId(bd, id) {
    return new Promise((resolve, reject) => {
      bd.query('SELECT * FROM usuarios WHERE id = ?', [id], (erro, linhas) => {
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
          if (erro) {
            reject(erro);
          } else {
            resolve('Usuário adicionado com sucesso!');
          }
        }
      );
    });
  }

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
