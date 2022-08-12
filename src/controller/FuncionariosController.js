import FuncionariosDAO from '../DAO/FuncionariosDAO.js';
import FuncionariosModel from '../model/FuncionariosModel.js';

export const Funcionarios = (app, bd) => {
  app.get('/funcionarios', async (_, response) => {
    try {
      const funcionarios = await FuncionariosDAO.listarFuncionarios(bd);

      if (!funcionarios) {
        response.status(404).send('Nenhum funcionário encontrado');
      }

      response.status(200).json(funcionarios);
    } catch (erro) {
      response.status(400).json({ error: erro.message });
    }
  });

  app.get('/funcionarios/:id', async (request, response) => {
    try {
      const id = request.params.id;
      const funcionario = await FuncionariosDAO.listarFuncionariosPorID(bd, id);

      if (!funcionario) {
        response.status(404).json({ erro: 'Funcionário não encontrado' });
      }

      response.status(200).json(funcionario);
    } catch (erro) {
      response.status(400).json({ error: erro.message });
    }
  });

  app.post('/funcionarios', async (request, response) => {
    const { CPF, nome, cargo, salario, statusFuncionario } = request.body;
    const funcionario = new FuncionariosModel(
      CPF,
      nome,
      cargo,
      salario,
      statusFuncionario
    );

    try {
      await FuncionariosDAO.adicionarFuncionario(bd, funcionario);
      response
        .status(201)
        .json({ message: 'Funcionário adicionado com sucesso' });
    } catch (erro) {
      response.status(400).json({ error: erro });
    }
  });

  app.patch('/funcionarios/:id', async (request, response) => {
    const id = request.params.id;
    const funcionarioExiste = await FuncionariosDAO.listarFuncionariosPorID(
      bd,
      id
    );

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
      await FuncionariosDAO.atualizarFuncionario(bd, id, funcionarioAtualizado);
      response.status(200).json('Funcinário atualizado com sucesso');
    } catch (erro) {
      response.status(400).json({ error: erro.message });
    }
  });

  app.delete('/funcionarios/:id', async (request, response) => {
    const id = request.params.id;
    const funcionarioExiste = await FuncionariosDAO.listarFuncionariosPorID(
      bd,
      id
    );

    if (!funcionarioExiste) {
      return response.status(404).json('Funcionário não encontrado');
    }

    try {
      await FuncionariosDAO.deletarFuncionario(bd, id);
      response.status(200).json('Funcionário deletado com sucesso');
    } catch (erro) {
      response.status(400).json({ error: erro.message });
    }
  });
};
