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

  static adicionarUsuario(bd, usuario) {
    const { nome, email, senha, CPF } = usuario;

    return new Promise((resolve, reject) => {
      bd.run(
        'INSERT INTO usuarios (nome, email, senha, CPF) VALUES (?, ?, ?, ?)',
        [nome, email, senha, CPF],
        erro => {
          if (!erro) {
            return resolve('Usuário adicionado com sucesso!');
          }

          if (erro.message.includes('UNIQUE constraint failed')) {
            if (erro.message.includes('email')) {
              return reject('E-mail já cadastrado!');
            } else if (erro.message.includes('CPF')) {
              return reject('CPF já cadastrado!');
            }
          }

          return reject(erro);
        }
      );
    });
  }

  static atualizarUsuario(bd, id, usuarioAtualizado) {
    const { nome, senha } = usuarioAtualizado;

    return new Promise((resolve, reject) => {
      bd.run(
        'UPDATE usuarios SET nome = ?, senha = ?WHERE id = ?',
        [nome, senha, id],
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
