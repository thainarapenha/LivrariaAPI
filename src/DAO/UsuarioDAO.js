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
}
