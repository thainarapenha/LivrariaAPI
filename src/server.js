import express from 'express';
import cors from 'cors';
import bd from './data/sqlite.js';
import { Livros } from './controller/LivrosController.js';
import { Usuarios } from './controller/UsuarioController.js';
import { Funcionarios } from './controller/FuncionariosController.js';
import { Estoque } from './controller/EstoqueController.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

Estoque(app, bd);
Livros(app);
Usuarios(app, bd);
Funcionarios(app, bd);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
