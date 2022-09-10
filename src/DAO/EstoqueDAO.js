import { database } from '../infra/database.js';

export default class EstoqueDAO {
  static listarEstoque() {
    return database.query('SELECT * FROM estoque');
  }

  static listarEstoquePorId(id) {
    return database.query('SELECT * FROM estoque WHERE id = $1', [id]);
  }

  static adicionarEstoque(dadosEstoque) {
    const query =
      'INSERT INTO estoque (nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote) VALUES ($1, $2, $3, $4, $5, $6)';

    return database.query(query, Object.values(dadosEstoque));
  }

  static atualizarEstoque(id, estoqueAtualizado) {
    const query =
      'UPDATE estoque SET nome_fornecedor = $1, CNPJ = $2, qnt_livros = $3, lote = $4, nome_obra = $5, preco_lote = $6 WHERE id = $7';

    return database.query(query, [...Object.values(estoqueAtualizado), id]);
  }

  static deletarEstoque(id) {
    return database.query('DELETE FROM estoque WHERE id = $1', [id]);
  }
}
