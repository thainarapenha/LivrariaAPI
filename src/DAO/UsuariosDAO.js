import { database } from '../infra/database.js';

export default class UsuariosDAO {
  static listarUsuarios() {
    return database.query('SELECT * FROM usuarios');
  }

  static listarUsuarioPorId(id) {
    return database.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  }

  static listarUsuarioPorEmail(email) {
    return database.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  }

  static adicionarUsuario(dadosUsuario) {
    const query =
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';

    return database.query(query, Object.values(dadosUsuario));
  }

  static atualizarUsuario(id, usuarioAtualizado) {
    const query =
      'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4';

    return database.query(query, [...Object.values(usuarioAtualizado), id]);
  }

  static deletarUsuario(id) {
    return database.query('DELETE FROM usuarios WHERE id = $1', [id]);
  }
}
