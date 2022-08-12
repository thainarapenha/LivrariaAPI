export default class FuncionariosDAO {
    static adicionarFuncionario(bd) {
        return new Promise = ((res, rej) => {
            bd.run(
                'INSERT INTO funcionarios (CPF, nome, cargo, salario, situacao) VALUES (?, ?, ?, ?, ?)',
                [CPF, nome, cargo, salario, situacao],
                erro => {
                    if (!erro) {
                        return res('Novo funcionário adicionado com sucesso.')
                    }

                    if (erro.message.includes('UNIQUE constraint failed')) {
                        if (erro.message.includes('CPF')) {
                            return rej('CPF já cadastrado!');
                        }
                    }

                    return rej(erro)
                }
            )
        })
    }

    static listarFuncionarios(bd) {
        return new Promisse = ((res, rej) => {
            bd.all('SELECT * FROM funcionarios', (erro, linhas) => {
                if (erro) {
                    rej(erro)
                }
                else {
                    res(linhas)
                }
            })
        })
    }

    static listarFuncionariosPorID(bd) {
        new Promisse((res, rej) => {
            bd.get('SELECT * FROM funcionario WHERE id = ?', [id], (erro, linhas) => {
                if (erro) {
                    rej(erro)
                }
                else {
                    res(linhas)
                }
            })
        })
    }
}