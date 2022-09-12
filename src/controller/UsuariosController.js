import bcrypt from 'bcrypt';

import UsuariosDAO from '../dao/UsuariosDAO.js';
import UsuarioModel from '../model/UsuarioModel.js';

async function listarUsuarios(_, response) {
  try {
    const usuarios = await UsuariosDAO.listarUsuarios();

    if (!usuarios) {
      return response
        .status(404)
        .json({ message: 'Nenhum usuário cadastrado' });
    }

    usuarios.forEach(usuario => (usuario.senha = undefined));
    response.json(usuarios);
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

async function listarUsuarioPorId(request, response) {
  const { id } = request.params;

  try {
    const usuario = await UsuariosDAO.listarUsuarioPorId(id);

    if (!usuario) {
      return response.status(404).json({ message: 'Usuário não existe' });
    }

    usuario.senha = undefined;
    response.json(usuario);
  } catch (erro) {
    response.status(500).json({ error: erro.message });
  }
}

async function registrarUsuario(request, response) {
  const { nome, email, senha } = request.body;
  const senhaCriptografada = bcrypt.hashSync(senha, 10);

  const usuario = new UsuarioModel(nome, email, senhaCriptografada);

  try {
    await UsuariosDAO.adicionarUsuario(usuario);
    response
      .status(201)
      .json({ usuario, message: 'Usuário cadastrado com sucesso' });
  } catch (erro) {
    response.status(500).json({ error: erro.message });
  }
}

async function loginUsuario(request, response) {
  const { email, senha } = request.body;

  try {
    const usuario = await UsuariosDAO.listarUsuarioPorEmail(email);

    if (!usuario) {
      return response.status(403).json({ message: 'Usuário não existe' });
    }

    const validaSenha = bcrypt.compareSync(String(senha), usuario.senha);

    if (!validaSenha) {
      return response.status(403).json({ message: 'Usuário não autorizado' });
    }

    usuario.senha = undefined;
    return response.json({ usuario, message: 'Usuário autorizado' });
  } catch (erro) {
    response.status(500).json({ error: erro.message });
  }
}

async function atualizarUsuario(request, response) {
  const { id } = request.params;
  const { nome, email, senha } = request.body;
  const usuarioAtualizado = new UsuarioModel(nome, email, senha);

  const usuario = await UsuariosDAO.listarUsuarioPorId(id);

  if (!usuario) {
    return response.status(404).json({ message: 'Usuário não existe' });
  }

  try {
    await UsuariosDAO.atualizarUsuario(id, usuarioAtualizado);
    response.json({ message: 'Usuário atualizado com sucesso' });
  } catch (erro) {
    res.status(500).json({ error: erro.message });
  }
}

async function deletarUsuario(request, response) {
  const { id } = request.params;
  const usuario = await UsuariosDAO.listarUsuariosPorId(id);

  if (!usuario) {
    return response.status(404).json({ message: 'Usuário não existe' });
  }

  try {
    await UsuariosDAO.deletarUsuario(id);
    response.json({ message: 'Usuário deletado do banco de dados' });
  } catch (erro) {
    res.status(500).json({ error: erro.message });
  }
}

export default {
  listarUsuarios,
  listarUsuarioPorId,
  registrarUsuario,
  loginUsuario,
  atualizarUsuario,
  deletarUsuario,
};
