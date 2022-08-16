import EstoqueDAO from '../DAO/EstoqueDAO.js';
import EstoqueModel from '../model/EstoqueModel.js';

export const Estoque = (app, bd) => {
    //READ
    app.get('/estoque', async (req, res) => {
        try {
            const estoque = await EstoqueDAO.listarEstoque(bd);
            res.status(200).json(estoque);
        } catch (err) {
            res.status(400).json(err);
        }
    });

    //READ for Id
    app.get('/estoque/:id', async (req, res) => {
        try {
            const id_estoque = req.params.id;
            const estoque = await EstoqueDAO.listarEstoquePorId(bd, id_estoque);

            if (!estoque) {
                return res.status(400).json({ message: 'Não encontrado' });
            }
            res.status(200).json(estoque);
        } catch (err) {
            res.status(400).json(err);
        }
    });

    //CREATE
    app.post('/estoque', async (req, res) => {
        const { nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote } =
            req.body;
        const estoque = new EstoqueModel(
            nome_fornecedor,
            CNPJ,
            qnt_livros,
            lote,
            nome_obra,
            preco_lote
        );

        try {
            await EstoqueDAO.adicionarEstoque(bd, estoque);
            res.status(200).json({ message: 'Adicionado ao estoque com sucesso' });
        } catch (erro) {
            res.status(400).json({ error: erro });
        }
    });

    //UPDATE
    app.patch('/estoque/:id', async (req, res) => {
        const id_estoque = req.params.id;
        const { nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote } =
            req.body;
        const estoqueAtualizado = new EstoqueModel(
            nome_fornecedor,
            CNPJ,
            qnt_livros,
            lote,
            nome_obra,
            preco_lote
        );

        const estoqueExiste = await EstoqueDAO.listarEstoquePorId(bd, id_estoque);

        if (!estoqueExiste) {
            return res.status(404).json({ message: 'Não encontrado' });
        }

        try {
            await EstoqueDAO.atualizarEstoque(bd, id_estoque, estoqueAtualizado);
            res.status(200).json({ message: 'Atualizado com sucesso' });
        } catch (erro) {
            res.status(400).json({ error: erro });
        }
    });

    //DELETE
    app.delete('/estoque/:id', async (req, res) => {
        const id_estoque = req.params.id;
        const estoqueExiste = await EstoqueDAO.listarEstoquePorId(bd, id_estoque);

        if (!estoqueExiste) {
            return res.status(404).json({ message: 'Não encontrado' });
        }

        try {
            await EstoqueDAO.deletarEstoque(bd, id_estoque);
            res.status(200).json({ message: 'Deletado com sucesso' });
        } catch (erro) {
            res.status(400).json({ error: erro });
        }
    });
};
