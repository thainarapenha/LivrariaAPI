import express from 'express';
import cors from 'cors';
import bd from './data/sqlite.js';
import { Usuarios } from './controller/UsuarioController.js';
import { Funcionarios } from './controller/FuncionariosController.js';

import { Livros } from './controller/LivrosController.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

Livros(app, bd);

Usuarios(app, bd);
Funcionarios(app, bd);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
