export default class EstoqueDAO {
    //métodos
    static listarEstoque(bd) {
        return new Promise((resolve, reject) => {
            bd.all('SELECT * FROM estoque', (erro, linhas) => {
                if (erro) {
                    console.log(erro);
                    reject(erro);
                } else {
                    resolve(linhas);
                }
            });
        });
    }

    static listarEstoquePorId(bd, id_estoque) {

        return new Promise((resolve, reject) => {
            bd.get(
                'SELECT * FROM estoque WHERE id_estoque = ?',
                [id_estoque],
                (erro, linhas) => {
                    if (!erro) {
                        resolve(linhas);
                    } else {
                        reject(erro);
                    }
                }
            );
        });
    }

    static adicionarEstoque(bd, estoque) {
        const { nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote } =
            estoque;

        return new Promise((resolve, reject) => {
            bd.run(
                'INSERT INTO estoque (nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote) VALUES (?, ?, ?, ?, ?, ?)',
                [nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote],
                erro => {
                    if (!erro) {
                        resolve('Estoque cadastrado com sucesso');
                    } else {
                        reject(erro.message);
                    }
                }
            );
        });
    }

    static atualizarEstoque(bd, id_estoque, estoqueAtualizado) {
        const { nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote } =
            estoqueAtualizado;

        return new Promise((resolve, reject) => {
            bd.run(
                'UPDATE estoque SET nome_fornecedor = ?, CNPJ = ?, qnt_livros = ?, lote = ?, nome_obra = ?, preco_lote = ? WHERE id_estoque = ?',
                [
                    nome_fornecedor,
                    CNPJ,
                    qnt_livros,
                    lote,
                    nome_obra,
                    preco_lote,
                    id_estoque,
                ],
                erro => {
                    if (erro) {
                        reject(erro);
                    } else {
                        resolve('Estoque atualizado com sucesso!');
                    }
                }
            );
        });
    }

    static deletarEstoque(bd, id_estoque) {
        return new Promise((resolve, reject) => {
            bd.run('DELETE FROM estoque WHERE id_estoque = ?', [id_estoque], erro => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve('Estoque deletado com sucesso!');
                }
            });
        });
    }
}
