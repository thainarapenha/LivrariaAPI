import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

import { Usuarios } from './controller/UsuarioController.js';7
Usuarios(app)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});