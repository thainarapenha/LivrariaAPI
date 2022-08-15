import UsuarioDAO from '../DAO/UsuarioDAO.js';
import { validacaoUsuario } from '../middleware/validacaoUsuario.js';
import UsuarioModel from '../model/UsuarioModel.js';

export const Usuarios = (app, bd) => {
  //CREATE
  app.post('/usuarios', validacaoUsuario, async (req, res) => {
    const { nome, email, senha, CPF } = req.body;
    const usuario = new UsuarioModel(nome, email, senha, CPF);
    const message = {
      success: 'Usuário adicionado com sucesso!',
      error: false,
    };

    try {
      await UsuarioDAO.adicionarUsuario(bd, usuario);
      res.status(201).json(message);
    } catch (erro) {
      res.status(400).json({ error: erro });
    }
  });

  //READ
  app.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await UsuarioDAO.listarUsuarios(bd);
      const message = {
        success: 'Nenhum usuário cadastrado!',
        error: false,
      };

      if (!usuarios) {
        return res.status(404).json(message.success);
      }

      res.status(200).json(usuarios);
    } catch (erro) {
      res.status(400).json({ error: erro.message });
    }
  });

  app.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const message = {
      success: 'Usuário não existe!',
      error: false,
    };

    try {
      const usuario = await UsuarioDAO.listarUsuariosPorId(bd, id);

      if (!usuario) {
        return res.status(404).json(message);
      }

      usuario.senha = undefined;
      res.status(200).json(usuario);
    } catch (erro) {
      res.status(500).json({ error: erro });
    }
  });

  //UPDATE
  app.patch('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, email, senha, CPF } = req.body;
    const usuarioAtualizado = new UsuarioModel(nome, email, senha, CPF);
    const message = {
      success: 'O usuário especificado não foi encontrado.',
      error: false,
    };
    const messageAtt = {
      success: 'Usuário atualizado com sucesso.',
      error: false,
    };

    const usuarioBd = await UsuarioDAO.listarUsuariosPorId(bd, id);

    if (!usuarioBd) {
      return res.status(404).json(message);
    }

    try {
      await UsuarioDAO.atualizarUsuario(bd, id, usuarioAtualizado);
      res.status(200).json(messageAtt);
    } catch (erro) {
      res.status(400).json({ error: erro });
    }
  });

  //DELETE
  app.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const usuarioBd = await UsuarioDAO.listarUsuariosPorId(bd, id);
    const message = {
      success: 'O usuário especificado não foi encontrado.',
      error: false,
    };
    const messageDelete = {
      success: 'Usuário deletado com sucesso.',
      error: false,
    };

    if (!usuarioBd) {
      return res.status(404).json(message);
    }

    try {
      await UsuarioDAO.deletarUsuario(bd, id);
      res.status(200).json(messageDelete);
    } catch (erro) {
      res.status(400).json({ error: erro });
    }
  });
};
