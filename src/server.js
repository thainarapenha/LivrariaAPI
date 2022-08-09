import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
