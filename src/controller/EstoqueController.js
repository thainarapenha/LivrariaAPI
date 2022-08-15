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

    //READ for Id
    app.get('/estoque/:id', (req, res) => {
        const id_estoque = req.params.id
        EstoqueDAO.listarEstoquePorId(bd, id_estoque)
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
            res.status(200).json(message.success)
        } catch (erro) {
            res.status(400).json({error: erro.message })
        }
    });

    //UPDATE 
    app.patch('/estoque/:id', async(req, res) => {
        const id_estoque = req.params.id
        const {nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote} = req.body;
        const estoqueAtualizado = new EstoqueModel(nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote)
        const message = {
            success: 'O estoque especificado não foi encontrado.',
            error: false
        }
        const messageAtt = {
            success: 'Estoque atualizado com sucesso.',
            error: false
        }
        const EstoqueExiste = await EstoqueDAO.listarEstoquePorId(bd, id_estoque);
            if(!EstoqueExiste){
                return res
                    .status(404)
                    .json(message.success);
            }
            try {
                await EstoqueDAO.atualizarEstoque(bd, id_estoque, estoqueAtualizado); // parametros chamados
                res.status(200).json(messageAtt.success);
            } catch (erro) {
                res.status(400).json({ error: erro.message });
            }
    });

    //DELETE
    app.delete('/estoque/:id', async(req, res) => {
        const id_estoque = req.params.id
        const EstoqueExiste = await EstoqueDAO.listarEstoquePorId(bd, id_estoque);
        const message = {
            success: 'O estoque especificado não foi encontrado.',
            error: false
        }
        const messageDelete = {
            success: 'Estoque deletado com sucesso.',
            error: false
        }
        if(!EstoqueExiste){
            return res.status(404).json(message.success)
        }
        try{ 
            await EstoqueDAO.deletarEstoque(bd, id_estoque)
            res.status(200).json(messageDelete.sucess)
        }catch(erro){
            res.status(400).json({error: erro.message });
        }
    });
}