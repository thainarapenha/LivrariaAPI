import { Router } from 'express';

import EstoqueController from '../controller/EstoqueController.js';

const estoqueRouter = Router();

estoqueRouter.get('/estoque', EstoqueController.listarEstoque);
estoqueRouter.get('/estoque/:id', EstoqueController.listarEstoquePorId);
estoqueRouter.post('/estoque', EstoqueController.adicionarEstoque);
estoqueRouter.patch('/estoque/:id', EstoqueController.atualizarEstoque);
estoqueRouter.delete('/estoque/:id', EstoqueController.deletarEstoque);

export { estoqueRouter };
