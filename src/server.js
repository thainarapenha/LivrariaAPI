import express from 'express';
import bd from './data/sqlite.js';
import {Livros} from './controller/LivrosController.js'

const app = express();
const port = 3000;

app.use(express.json());

Livros(app,bd)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
