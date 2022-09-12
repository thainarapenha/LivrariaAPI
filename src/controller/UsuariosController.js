import bcrypt from 'bcrypt';

import UsuariosDAO from '../dao/UsuariosDAO.js';
import UsuarioModel from '../model/UsuarioModel.js';

async function listarUsuarios(_, response) {
  try {
    const { rows: usuarios } = await UsuariosDAO.listarUsuarios();

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
    const { rows: usuario } = await UsuariosDAO.listarUsuarioPorId(id);

    if (!usuario) {
      return response.status(404).json({ message: 'Usuário não existe' });
    }

    usuario[0].senha = undefined;
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

    usuario.senha = undefined;
    return response
      .status(201)
      .json({ usuario, message: 'Usuário cadastrado com sucesso' });
  } catch (erro) {
    return response.status(500).json({ error: erro.message });
  }
}

async function loginUsuario(request, response) {
  console.log(request.body);
  const { email, senha } = request.body;

  try {
    const { rows: usuario } = await UsuariosDAO.listarUsuarioPorEmail(email);

    if (!usuario) {
      return response.status(403).json({ message: 'Usuário não existe' });
    }

    const validaSenha = bcrypt.compareSync(String(senha), usuario[0].senha);

    if (!validaSenha) {
      return response.status(403).json({ message: 'Usuário não autorizado' });
    }

    usuario[0].senha = undefined;
    return response.json({
      usuario: usuario[0],
      message: 'Usuário autorizado',
    });
  } catch (erro) {
    response.status(500).json({ error: erro.message });
  }
}

async function atualizarUsuario(request, response) {
  const { id } = request.params;
  const { nome, email, senha } = request.body;
  const senhaCriptografada = bcrypt.hashSync(senha, 10);

  const usuarioAtualizado = new UsuarioModel(nome, email, senhaCriptografada);

  const { rows: usuario } = await UsuariosDAO.listarUsuarioPorId(id);

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
  const { rows: usuario } = await UsuariosDAO.listarUsuariosPorId(id);

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
