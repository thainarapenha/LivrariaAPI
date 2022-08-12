export default class FuncionariosDAO {
    static adicionarFuncionario(bd, funcionario) {
        const { CPF, nome, cargo, salario, situacao } = funcionario

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

    static listarFuncionariosPorID(bd, id) {
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

    static atualizarFuncionario(bd, funcionario) {
        const { nome, cargo, salario, situacao } = funcionario

        return new Promisse((res, rej) => {
            bd.run('UPDATE funcionarios SET nome = ?, cargo = ?, salario = ?, situacao = ? WHERE id = ?',
                [nome, cargo, salario, situacao],
                erro => {
                    if (erro) {
                        rej(erro.message)
                    }
                    else {
                        res('Os dados do funcionário foram atualizados!')
                    }
                })
        })
    }

    static deletarFuncionario(bd, id) {
        return new Promisse((res, rej) => {
            bd.run('DELETE FROM funcionarios WHERE id = ?', [id], erro => {
                if (erro) {
                    rej(erro)
                }
                else {
                    res('O funcionário foi deletado com sucesso!')
                }
            })
        })
    }
}