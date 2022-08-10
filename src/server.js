import express from 'express';
import { Usuarios } from './controller/UsuarioController.js'
import bd from './data/sqlite.js';

const app = express();
const port = 3000;

app.use(express.json());

Usuarios(app, bd)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
