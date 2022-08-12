import express from 'express';
import cors from 'cors';
import { Usuarios } from './controller/UsuarioController.js';
import bd from './data/sqlite.js';

const app = express();
const port = 3000;

const corsConfig = {
  origin: '*',
  methods: 'GET,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsConfig));
app.use(express.json());

Usuarios(app, bd);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
