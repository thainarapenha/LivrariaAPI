import  UsuarioDAO  from "../DAO/UsuarioDAO.js"
import { validacaoUsuario } from "../middleware/validacaoUsuario.js"

export const Usuarios = (app, bd) => {

    //CREATE

    app.post('/usuarios', validacaoUsuario, (req, res) => {
        const usuario = req.body
        UsuarioDAO.adicionarUsuario(bd, usuario)
            .then((success) => {
                res.status(200).json(success)
            })
            .catch((erro) => {
                res.status(500).json(erro)
            })
    })

    //READ

    app.get('/usuarios', (req, res) => {
        UsuarioDAO.listarUsuarios(bd)
            .then((success) => {
                success.senha = undefined
                res.status(200).json(success)
            })
            .catch((erro) => {
                res.status(500).json(erro)
            })
    }) 

    app.get('/usuarios/:id', (req, res) => {
        const id = req.params.id
        UsuarioDAO.listarUsuariosPorId(bd, id)
            .then((success) => {
                success.senha = undefined
                res.status(200).json(success)
            })
            .catch((erro) => {
                res.status(500).json(erro)
            })
    })

    //UPDATE 

    app.patch('/usuarios/:id', async (req, res) => {
        const id = req.params.id
        const usuarioAtualizado = req.body
        const usuarioBd = UsuarioDAO.listarUsuariosPorId(bd, id)

        if(usuarioBd === undefined) {
            res.status(404).send('O usuário especificado não foi encontrado.')
        }

        try {
            await UsuarioDAO.atualizarUsuario(bd, id, usuarioAtualizado)
            res.status(200).send('Usuário atualizado com sucesso.')
        }
        catch(error) {
            res.status(500).json(error)
        }
    })

    //DELETE

    app.delete('/usuarios/:id', (req, res) => {
        const id = req.params.id
        UsuarioDAO.deletarUsuario(bd, id)
        .then((success) => {
            res.status(200).json(success)
        })
        .catch((erro) => {
            res.status(500).json(erro)
        })
    })
}
