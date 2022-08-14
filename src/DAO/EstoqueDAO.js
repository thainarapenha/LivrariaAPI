export default class EstoqueDAO {

    //métodos
    static listarEstoque(bd){
        return new Promise((resolve, reject) => {
            bd.all('SELECT * FROM estoque', (error, linhas) => {
                if (erro) {
                    console.log(erro);
                    reject(erro);
                  } else {
                    resolve(linhas);
                  }
            });
        });
    }

    static adicionarEstoque(bd){
        const {nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote} = estoque;

        return new Promise((resolve, reject) => {
            bd.run(
                'INSERT INTO estoque (nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote) VALUES (?, ?, ?, ?, ?, ?)',
                [nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote],
                erro => {
                    if (!erro) {
                        resolve("Estoque cadastrado com sucesso")
                    } else {
                        reject(erro.message);
                    }
                }
            );
        });
    }

    static atualizarEstoque(bd){
        const {nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote} = estoque;

        return new Promise((resolve, reject) => {
            bd.run(
                'UPDATE estoque SET nome_fornecedor = ?, CNPJ = ?, qnt_livros = ?, lote = ?, nome_obra = ?, preco_lote = ?',
                [nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote],
                erro => {
                    if (erro) {
                      reject(erro);
                    } else {
                      resolve('Estoque atualizado com sucesso!');
                    }
                }
            );
        })
    }

    static deletarEstoque(bd){
        return new Promise((resolve, reject) => {
            bd.run(
                'DELETE FROM estoque WHERE id_estoque = ?',
                [id_estoque],
                erro => {
                    if(erro){
                        reject(erro)
                    } else {
                        resolve('Estoque deletado com sucesso!')
                    }
                }
            );
        })
    }
}