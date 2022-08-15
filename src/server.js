import express from 'express';
import bd from './data/sqlite.js';
import { Funcionarios } from './controller/FuncionariosController.js';

const app = express();
const port = 3000;

app.use(express.json());

Funcionarios(app, bd);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
