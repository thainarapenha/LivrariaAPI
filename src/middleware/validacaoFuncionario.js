import { validaCPF } from './validacaoUsuario.js';

export function validaFuncionario(request, response, next) {
  let { CPF, nome, cargo, salario, statusFuncionario } = request.body;
  CPF = validaCPF(CPF);

  if (!CPF) {
    return response.status(400).json({ error: 'CPF inválido' });
  }

  if (!nome || !cargo || !salario || !statusFuncionario) {
    return response.status(400).json({ error: 'Dados insuficientes' });
  }

  next();
}
