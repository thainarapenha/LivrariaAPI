function validacaoUsuario(request, response, next) {
  let { nome, email, senha, CPF } = request.body;
  CPF = validaCPF(CPF);

  if (!nome) {
    return response.status(400).json({ error: 'Nome é obrigatório' });
  }

  if (!CPF) {
    return response.status(400).json({ erro: 'CPF inválido' });
  }

  if (!validaEmail(email)) {
    return response.status(400).json({ erro: 'Email inválido' });
  }

  if (senha.length < 6) {
    return response
      .status(400)
      .json({ erro: 'Senha deve ter no mínimo 6 caracteres' });
  }

  return next();
}

const validaCPF = CPF => {
  const CPFatualizado = CPF.replace(/\D/g, '');

  if (CPFatualizado.length !== 11) {
    return false;
  }

  return CPFatualizado;
};

const validaEmail = email => {
  const regexValidaEmail = /^\S+@\S+\.\S+$/;

  return regexValidaEmail.test(email);
};

export { validacaoUsuario };
