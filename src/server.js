import express from 'express';
import bd from './data/sqlite.js';
import { Usuarios } from './controller/UsuarioController.js';

const app = express();
const port = 3000;

app.use(express.json());

Usuarios(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
