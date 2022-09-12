const validaCPF = CPF => {
  const CPFatualizado = String(CPF).replace(/\D/g, '');
  console.log(CPFatualizado);
  if (CPFatualizado.length !== 11 && !/[A-Z]/gi.test(CPFatualizado)) {
    return false;
  }

  return CPFatualizado;
};

export function validaFuncionario(request, response, next) {
  let { CPF, nome, cargo, salario, statusFuncionario } = request.body;
  CPF = validaCPF(CPF);

  if (!CPF) {
    return response.status(400).json({ error: 'CPF inválido' });
  }

  if (!nome || !cargo || !salario || !statusFuncionario) {
    return response.status(400).json({ error: 'Dados insuficientes' });
  }

  request.body.CPF = CPF;
  next();
}
