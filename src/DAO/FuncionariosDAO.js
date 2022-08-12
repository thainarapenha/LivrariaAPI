export default class FuncionariosDAO {
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
        new Promisse ((res, rej) => {
            bd.get('SELECT * FROM funcionario WHERE id = ?', [id], (erro, linhas) => {
                if(erro) {
                    rej(erro)
                }
                else {
                    res(linhas)
                }
            })
        })
    }
}