import { Router } from 'express';
import LivrosController from '../controller/LivrosController.js';
import validacaoLivro from '../middleware/validacaoLivros.js';

const livrosRouter = Router();

livrosRouter.get('/livros', LivrosController.listarLivros);
livrosRouter.get('/livros/:id', LivrosController.listarLivroPorId);
livrosRouter.post('/livros', validacaoLivro, LivrosController.adicionarLivro);
livrosRouter.patch(
  '/livros/:id',
  validacaoLivro,
  LivrosController.atualizarLivro
);
livrosRouter.delete('/livros/:id', LivrosController.deletarLivro);

export { livrosRouter };
