export default class FuncionariosDAO {
    static listarFuncionarios(bd) {
        return new Promisse = ((res, rej) => {
            bd.all('SELECT * FROM funcionarios', (erro, linhas) => {
                if (erro) {
                    console.log(erro)
                    rej(erro)
                }
                else {
                    res(linhas)
                }
            })
        })
    }
}