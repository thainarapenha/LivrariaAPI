import LivroDAO from "../DAO/LivrosDAO.js"
import bd from "../data/sqlite.js"
import LivrosModel from "../model/LivrosModel.js"

export const Livros = app => {

    //READ 
    app.get('/livros/', (req, res) => {
        LivroDAO.listarLivros(bd)
            .then((success) => {
                res.status(200).json(success)
            }).catch((error) => {
                res.status(400).json(error)
            })

    })

    app.get('/livros/:id', (req, res) => {
        const id_livro = req.params.id
        LivroDAO.listarLivrosPorId(bd, id_livro)
            .then((success) => {
                res.status(200).json(success)
            }).catch((error) => {
                res.status(400).json(error)
            })
    })

    //CREATE 
    app.post('/livros', async (req, res) => {
        const { titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor } = req.body
        const livro = new LivrosModel(titulo, descricao, categoria, url_img, preco, total_paginas, ano_publicacao, autor)
        try {
            await LivroDAO.adicionarLivros(bd, livro)
            res.status(200).json(success)
        } catch (erro) {
            res.status(400).json(erro)

        }
    })
    //UPDATE 

}
