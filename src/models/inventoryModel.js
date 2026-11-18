export default class InventoryModel {
  constructor(supplierName, taxId, bookQuantity, batch, workName, batchPrice) {
    this.nome_fornecedor = supplierName
    this.CNPJ = taxId
    this.qnt_livros = bookQuantity
    this.lote = batch
    this.nome_obra = workName
    this.preco_lote = batchPrice
  }
}
