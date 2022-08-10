import { UsuarioDAO } from "../DAO/UsuarioDAO.js"

export const Usuarios = (app, bd) => {

    //CREATE

    app.post('/usuarios', (req, res) => {
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

    app.patch('/usuarios/:id', (req, res) => {
        const id = req.params.id
        const usuarioAtualizado = req.body
        UsuarioDAO.atualizarUsuario(bd, id, usuarioAtualizado)
        .then((success) => {
            res.status(200).json(success)
        })
        .catch((erro) => {
            res.status(500).json(erro)
        })
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
