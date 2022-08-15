import express from 'express';
import bd from './data/sqlite.js';



import { Estoque } from './controller/EstoqueController.js';

const app = express();
const port = 3000;

app.use(express.json());




Estoque.use(app, bd);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
