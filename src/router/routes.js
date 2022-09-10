import { livrosRouter } from './livrosRoutes.js';
import { funcionariosRouter } from './funcionariosRoutes.js';

export const routes = app => {
  app.use(livrosRouter);
  app.use(funcionariosRouter);
};
