import { database } from '../infra/database.js'

export default class InventoryDao {
  static listInventory() {
    return database.query('SELECT * FROM estoque')
  }

  static findInventoryById(id) {
    return database.query('SELECT * FROM estoque WHERE id_estoque = $1', [id])
  }

  static createInventory(inventoryData) {
    const query =
      'INSERT INTO estoque (nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote) VALUES ($1, $2, $3, $4, $5, $6)'

    return database.query(query, Object.values(inventoryData))
  }

  static updateInventory(id, updatedInventory) {
    const query =
      'UPDATE estoque SET nome_fornecedor = $1, qnt_livros = $2, lote = $3, nome_obra = $4, preco_lote = $5 WHERE id_estoque = $6'

    delete updatedInventory.CNPJ
    return database.query(query, [...Object.values(updatedInventory), id])
  }

  static deleteInventory(id) {
    return database.query('DELETE FROM estoque WHERE id_estoque = $1', [id])
  }
}
