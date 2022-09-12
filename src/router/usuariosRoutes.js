import { Router } from 'express';
import UsuariosController from '../controller/UsuariosController.js';
import {
  validacaoUsuario,
  verificaUsuarioJaExiste,
} from '../middleware/validacaoUsuario.js';

const usuariosRouter = Router();

usuariosRouter.get('/usuarios', UsuariosController.listarUsuarios);
usuariosRouter.get('/usuarios/:id', UsuariosController.listarUsuarioPorId);
usuariosRouter.post(
  '/usuarios/registrar',
  verificaUsuarioJaExiste,
  validacaoUsuario,
  UsuariosController.registrarUsuario
);
usuariosRouter.post('/usuarios/login', UsuariosController.loginUsuario);
usuariosRouter.patch(
  '/usuarios/:id',
  validacaoUsuario,
  UsuariosController.atualizarUsuario
);
usuariosRouter.delete('/usuarios/:id', UsuariosController.deletarUsuario);

export { usuariosRouter };
