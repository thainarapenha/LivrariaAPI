import EstoqueDAO from '../dao/EstoqueDAO.js';
import EstoqueModel from '../model/EstoqueModel.js';

async function listarEstoque(_, response) {
  try {
    const { rows: estoque } = await EstoqueDAO.listarEstoque();

    if (!estoque) {
      response.status(404).send('Nenhum estoque encontrado');
    }

    response.json(estoque);
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

async function listarEstoquePorId(request, response) {
  try {
    const { id } = request.params;
    const { rows: estoque } = await EstoqueDAO.listarEstoquePorId(id);

    if (!estoque) {
      response.status(404).json({ erro: 'Não encontrado' });
    }

    response.json(estoque);
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

async function adicionarEstoque(request, response) {
  const { nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote } =
    req.body;

  const estoque = new EstoqueModel(
    nome_fornecedor,
    CNPJ,
    qnt_livros,
    lote,
    nome_obra,
    preco_lote
  );

  try {
    await EstoqueDAO.adicionarEstoque(estoque);

    response
      .status(201)
      .json({ message: 'Informações adicionadas ao estoque com sucesso' });
  } catch (erro) {
    response.status(400).json({ error: erro });
  }
}

async function atualizarEstoque(request, response) {
  const { id } = request.params;
  const { rows: estoqueExiste } = await EstoqueDAO.listarEstoquePorId(id);

  if (!estoqueExiste) {
    return response
      .status(404)
      .json({ error: 'O estoque desejado não encontrado' });
  }

  const { nome_fornecedor, CNPJ, qnt_livros, lote, nome_obra, preco_lote } =
    req.body;

  const estoqueAtualizado = new EstoqueModel(
    nome_fornecedor,
    CNPJ,
    qnt_livros,
    lote,
    nome_obra,
    preco_lote
  );

  try {
    await EstoqueDAO.atualizarFuncionario(id, estoqueAtualizado);
    response.status(200).json('Estoque atualizado com sucesso');
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}
async function deletarEstoque(request, response) {
  const { id } = request.params;
  const { rows: estoqueExiste } = await EstoqueDAO.listarEstoquePorId(id);

  if (!estoqueExiste) {
    return response
      .status(404)
      .json({ error: 'O estoque desejado não encontrado' });
  }

  try {
    await EstoqueDAO.deletarEstoque(id);
    response
      .status(200)
      .json('Informações especificadas foram deletadas com sucesso');
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

export default {
  listarEstoque,
  listarEstoquePorId,
  adicionarEstoque,
  atualizarEstoque,
  deletarEstoque,
};
