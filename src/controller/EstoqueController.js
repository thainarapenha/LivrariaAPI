import EstoqueDAO from "../DAO/EstoqueDAO.js";
import EstoqueModel from "..model/EstoqueModel.js"

export const Estoque = (app, bd) => {

    //READ
    app.get('/estoque', (req, res) =>{
        EstoqueDAO.listarEstoque(bd)
        .then((success) => {
            res.status(200).json(success)
        }).catch((error) => {
            res.status(400).json(error)
        })
    })

    //CREATE
    app.post('/estoque', async(req, res) => {
        const {nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote} = req.body;
        const estoque = new EstoqueModel(nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote)
        const message = {
            success: 'Estoque cadastrado com sucesso',
            error: false
        }
        try {
            await EstoqueDAO.adicionarEstoque(bd, estoque)
            res.status(201).json(message.success)
        } catch (erro) {
            res.status(400).json({error: erro.message })
        }
    });
}