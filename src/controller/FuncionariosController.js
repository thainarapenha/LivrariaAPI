import FuncionarioDAO from '../DAO/FuncionarioDAO.js';
import FuncionarioModel from '../model/FuncionarioModel.js';

export const Funcionarios = (app, bd) => {
  app.get('/funcionarios', async (_, response) => {
    try {
      const funcionarios = await FuncionarioDAO.listaFuncionarios(bd);

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
      const funcionario = await FuncionarioDAO.listaFuncionariosPorId(bd, id);

      if (!funcionario) {
        response.status(404).send('Funcionário não encontrado');
      }

      response.status(200).json(funcionario);
    } catch (erro) {
      response.status(400).json({ error: erro.message });
    }
  });

  app.post('/funcionarios', async (request, response) => {
    const { CPF, nome, cargo, salario, status } = request.body;
    const funcionario = new FuncionarioModel(CPF, nome, cargo, salario, status);

    try {
      await FuncionarioDAO.cadastraFuncionario(bd, funcionario);
      response.status(201).json(funcionario);
    } catch (erro) {
      response.status(400).json({ error: erro.message });
    }
  });

  app.patch('/funcionarios/:id', async (request, response) => {
    const id = request.params.id;
    const funcionarioExiste = await FuncionarioDAO.listaFuncionariosPorId(
      bd,
      id
    );

    if (!funcionarioExiste) {
      return response.status(404).json({ error: 'Funcionário não encontrado' });
    }

    const { CPF, nome, cargo, salario, status } = request.body;
    const funcionarioAtualizado = new FuncionarioModel(
      CPF,
      nome,
      cargo,
      salario,
      status
    );

    try {
      await FuncionarioDAO.atualizaFuncionario(bd, id, funcionarioAtualizado);
      response.status(200).json('Funcinário atualizado com sucesso');
    } catch (erro) {
      response.status(400).json({ error: erro.message });
    }
  });

  app.delete('/funcionarios/:id', async (request, response) => {
    const id = request.params.id;
    const funcionarioExiste = await FuncionarioDAO.listaFuncionariosPorId(
      bd,
      id
    );

    if (!funcionarioExiste) {
      return response.status(404).json('Funcionário não encontrado');
    }

    try {
      await FuncionarioDAO.deletaFuncionario(bd, id);
      response.status(200).json('Funcionário deletado com sucesso');
    } catch (erro) {
      response.status(400).json({ error: erro.message });
    }
  });
};
