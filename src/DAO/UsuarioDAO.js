export default class UsuarioDAO {
  static listarUsuarios(bd) {
    return new Promise((resolve, reject) => {
      bd.query('SELECT * FROM usuario', (erro, linhas) => {
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
      bd.query('SELECT * FROM usuario WHERE id = ?', [id], (erro, linhas) => {
        if (erro) {
          reject(erro);
        } else {
          resolve(linhas);
        }
      });
    });
  }
}
