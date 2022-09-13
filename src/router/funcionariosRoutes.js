import { Router } from 'express';

import FuncionariosController from '../controller/FuncionariosController.js';
import { validaFuncionario } from '../middleware/validacaoFuncionario.js';

const funcionariosRouter = Router();

funcionariosRouter.get(
  '/funcionarios',
  FuncionariosController.listarFuncionarios
);

funcionariosRouter.get(
  '/funcionarios/:id',
  FuncionariosController.listarFuncionarioPorId
);

funcionariosRouter.post(
  '/funcionarios',
  validaFuncionario,
  FuncionariosController.adicionarFuncionario
);

funcionariosRouter.patch(
  '/funcionarios/:id',
  validaFuncionario,
  FuncionariosController.atualizarFuncionario
);

funcionariosRouter.delete(
  '/funcionarios/:id',
  FuncionariosController.deletarFuncionario
);

export { funcionariosRouter };
