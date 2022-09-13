import LivroDAO from '../dao/LivrosDAO.js';
import LivrosModel from '../model/LivrosModel.js';

async function listarLivros(_, response) {
  try {
    const { rows: livros } = await LivroDAO.listarLivros();

    response.json(livros);
  } catch (erro) {
    response.status(400).json({ error: erro });
  }
}

async function listarLivroPorId(request, response) {
  const { id } = request.params;

  try {
    const { rows: livro } = await LivroDAO.listarLivroPorId(id);

    if (!livro.length) {
      return response.status(400).json({ message: 'Livro não encontrado' });
    }

    response.json(livro);
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

async function adicionarLivro(request, response) {
  const livro = new LivrosModel(request.body);

  try {
    await LivroDAO.adicionarLivros(livro);
    response.status(201).json(livro);
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

async function atualizarLivro(request, response) {
  const { id } = request.params;
  const livroAtualizado = new LivrosModel(request.body);

  try {
    const { rows: livroExiste } = await LivroDAO.listarLivroPorId(id);

    if (!livroExiste.length) {
      return response.status(404).json({ erro: 'Livro não existe' });
    }

    await LivroDAO.atualizarLivro(id, livroAtualizado);
    response.status(200).json({ message: 'Livro atualizado com sucesso' });
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

async function deletarLivro(request, response) {
  const { id } = request.params;

  try {
    const { rows: livroExiste } = await LivroDAO.listarLivroPorId(id);

    if (!livroExiste.length) {
      return response.status(404).json({ erro: 'Livro não existe' });
    }

    await LivroDAO.deletarLivro(id);
    response.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (erro) {
    response.status(400).json({ error: erro.message });
  }
}

export default {
  listarLivros,
  listarLivroPorId,
  adicionarLivro,
  atualizarLivro,
  deletarLivro,
};
