import UsuariosDAO from '../dao/UsuariosDAO.js';

export async function verificaUsuarioJaExiste(request, response, next) {
  const { email } = request.body;

  try {
    const { rows: usuario } = await UsuariosDAO.listarUsuarioPorEmail(email);

    if (usuario.length > 0) {
      return response.status(409).json({
        message: 'Não é possível cadastrar um usuário com email repetido',
      });
    }

    return next();
  } catch (erro) {
    return response.status(400).json({ erro: erro.message });
  }
}

export function validacaoUsuario(request, response, next) {
  if (!request.body.nome) {
    return response.status(400).json({ error: 'Nome é obrigatório' });
  }

  if (!validaEmail(request.body.email)) {
    return response.status(400).json({ erro: 'Email inválido' });
  }

  if (request.body.senha.length < 6) {
    return response
      .status(400)
      .json({ erro: 'Senha deve ter no mínimo 6 caracteres' });
  }

  return next();
}

const validaEmail = email => {
  const regexValidaEmail = /^\S+@\S+\.\S+$/;
  return regexValidaEmail.test(email);
};
