import { database } from '../infra/database.js';

export default class FuncionariosDAO {
  static listarFuncionarios() {
    return database.query('SELECT * FROM funcionarios');
  }

  static listarFuncionariosPorId(id) {
    return database.query('SELECT * FROM funcionarios WHERE id = $1', [id]);
  }

  static adicionarFuncionario(dadosFuncionario) {
    const query =
      'INSERT INTO funcionarios (CPF, nome, cargo, salario, statusFuncionario) VALUES ($1, $2, $3, $4, $5)';

    return database.query(query, Object.values(dadosFuncionario));
  }

  static atualizarFuncionario(id, dadosFuncionario) {
    const query =
      'UPDATE funcionarios SET nome = $1, cargo = $2, salario = $3, statusFuncionario = $4 WHERE id = $5';

    return database.query(query, [...Object.values(dadosFuncionario), id]);
  }

  static deletarFuncionario(id) {
    return database.query('DELETE FROM funcionarios WHERE id = $1', [id]);
  }
}
