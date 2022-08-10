const validaUsuario = (request, response, next) => {
  const usuario = request.body;
  if (!usuario.nome || !usuario.email || !usuario.senha || !usuario.CPF) {
    response.status(400).send('Dados inválidos');
  } else {
    next();
  }
};

export { validaUsuario };
