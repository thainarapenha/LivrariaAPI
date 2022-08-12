import LivroDAO from "../DAO/LivrosDAO.js"
import bd from "../data/sqlite.js"

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
        LivroDAO.listarLivros(bd, id_livro)
        .then((success) => { 
            res.status(200).json(success)
        }).catch((error) => { 
            res.status(400).json(error)
        })
    })
    
     //CREATE 
     app.post('/livros', (req, res) => {
        const livro = req.body
        LivroDAO.adicionarLivros(bd,livro)
            .then((success) => {
                res.status(200).json(success)
            })
            .catch((erro) => {
                res.status(400).json(erro)
                
            })
    })


}
