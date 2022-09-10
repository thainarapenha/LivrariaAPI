import { livrosRouter } from './livrosRoutes.js';
import { funcionariosRouter } from './funcionariosRoutes.js';
import { estoqueRouter } from './estoqueRoutes.js';

export const routes = app => {
  app.use(livrosRouter);
  app.use(funcionariosRouter);
  app.use(estoqueRouter);
};
