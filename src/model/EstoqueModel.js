export default class EstoqueModel {
    constructor(nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote){
        this.nome_fornecedor = nome_fornecedor;
        this.CNPJ = CNPJ;
        this.qnt_livros = qnt_livros;
        this.lote = lote;
        this.nome_obra = nome_obra;
        this.preco_lote = preco_lote;
    }
}