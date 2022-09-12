import FuncionariosDAO from '../dao/FuncionariosDAO.js';
import FuncionariosModel from '../model/FuncionariosModel.js';

async function listarFuncionarios(_, response) {
  try {
    const { rows: funcionarios } = await FuncionariosDAO.listarFuncionarios();

    if (!funcionarios) {
      response.status(404).send('Nenhum funcionário encontrado');
    }

    response.json(funcionarios);
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

async function listarFuncionarioPorId(request, response) {
  try {
    const { id } = request.params;
    const { rows: funcionario } = await FuncionariosDAO.listarFuncionariosPorId(
      id
    );

    if (!funcionario) {
      response.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    response.json(funcionario);
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

async function adicionarFuncionario(request, response) {
  const { CPF, nome, cargo, salario, statusFuncionario } = request.body;
  const funcionario = new FuncionariosModel(
    CPF,
    nome,
    cargo,
    salario,
    statusFuncionario
  );

  try {
    await FuncionariosDAO.adicionarFuncionario(funcionario);

    response
      .status(201)
      .json({ message: 'Funcionário adicionado com sucesso' });
  } catch (erro) {
    response.status(400).json({ error: erro });
  }
}

async function atualizarFuncionario(request, response) {
  const { id } = request.params;
  const { rows: funcionarioExiste } =
    await FuncionariosDAO.listarFuncionariosPorId(id);

  if (!funcionarioExiste) {
    return response.status(404).json({ error: 'Funcionário não encontrado' });
  }

  const { CPF, nome, cargo, salario, statusFuncionario } = request.body;
  const funcionarioAtualizado = new FuncionariosModel(
    CPF,
    nome,
    cargo,
    salario,
    statusFuncionario
  );

  try {
    await FuncionariosDAO.atualizarFuncionario(id, funcionarioAtualizado);
    response.status(200).json('Funcinário atualizado com sucesso');
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}
async function deletarFuncionario(request, response) {
  const { id } = request.params;
  const { rows: funcionarioExiste } =
    await FuncionariosDAO.listarFuncionariosPorId(id);

  if (!funcionarioExiste) {
    return response.status(404).json('Funcionário não existe');
  }

  try {
    await FuncionariosDAO.deletarFuncionario(id);
    response.status(200).json('Funcionário deletado com sucesso');
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

export default {
  listarFuncionarios,
  listarFuncionarioPorId,
  adicionarFuncionario,
  atualizarFuncionario,
  deletarFuncionario,
};
