export default function validacaoLivro(req, res, next) {
  if (Object.keys(req.body).length < 8) {
    return res
      .status(400)
      .json({ erro: 'Insira todas as informações necessárias' });
  }

  for (let elemento in req.body) {
    if (!req.body[elemento]) {
      return res
        .status(400)
        .json({ erro: `${elemento} é um campo obrigatório` });
    }
  }

  return next();
}

