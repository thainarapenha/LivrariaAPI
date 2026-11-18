import { database } from '../infra/database.js'

export default class UsersDao {
  static listUsers() {
    return database.query('SELECT * FROM usuarios')
  }

  static findUserById(id) {
    return database.query('SELECT * FROM usuarios WHERE id = $1', [id])
  }

  static findUserByEmail(email) {
    return database.query('SELECT * FROM usuarios WHERE email = $1', [email])
  }

  static createUser(userData) {
    const query =
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)'

    return database.query(query, Object.values(userData))
  }

  static updateUser(id, updatedUser) {
    const query =
      'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4'

    return database.query(query, [...Object.values(updatedUser), id])
  }

  static deleteUser(id) {
    return database.query('DELETE FROM usuarios WHERE id = $1', [id])
  }
}
