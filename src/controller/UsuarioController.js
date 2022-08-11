import UsuarioDAO from '../DAO/UsuarioDAO.js';
import { validacaoUsuario } from '../middleware/validacaoUsuario.js';
import UsuarioModel from '../model/UsuarioModel.js';

export const Usuarios = (app, bd) => {
  //CREATE
  app.post('/usuarios', validacaoUsuario, async (req, res) => {
    const { nome, email, senha, CPF } = req.body;
    const usuario = new UsuarioModel(nome, email, senha, CPF);

    try {
      await UsuarioDAO.adicionarUsuario(bd, usuario);
      res.status(201).send({ message: 'Usuário adicionado com sucesso!' });
    } catch (erro) {
      res.status(400).json({ error: erro.message });
    }
  });

  //READ
  app.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await UsuarioDAO.listarUsuarios(bd);

      if (!usuarios) {
        return res.status(404).json('Nenhum usuário cadastrado!');
      }

      res.status(200).json({ usuarios });
    } catch (erro) {
      res.status(400).json({ error: erro.message });
    }
  });

  app.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    try {
      const usuario = await UsuarioDAO.listarUsuariosPorId(bd, id);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não existe!' });
      }

      res.status(200).json(usuario);
    } catch (erro) {
      res.status(500).json({ error: erro.message });
    }
  });

  //UPDATE
  app.patch('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, email, senha, CPF } = req.body;
    const usuarioAtualizado = new UsuarioModel(nome, email, senha, CPF);

    const usuarioBd = await UsuarioDAO.listarUsuariosPorId(bd, id);

    if (!usuarioBd) {
      return res.status(404).json({ message: 'O usuário especificado não foi encontrado.' });
    }

    try {
      await UsuarioDAO.atualizarUsuario(bd, id, usuarioAtualizado);
      res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      res.status(400).json({ error: erro.message });
    }
  });

  //DELETE
  app.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const usuarioBd = await UsuarioDAO.listarUsuariosPorId(bd, id);

    if (!usuarioBd) {
      return res.status(404).json({ message: 'O usuário especificado não foi encontrado.' });
    }

    try {
      await UsuarioDAO.deletarUsuario(bd, id);
      res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (erro) {
      res.status(400).json({ error: erro.message });
    }
  });
};
