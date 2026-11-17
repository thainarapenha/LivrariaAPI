import { usuariosRouter } from './usuariosRoutes.js';
import { funcionariosRouter } from './funcionariosRoutes.js';
import { estoqueRouter } from './estoqueRoutes.js';
import { booksRouter } from '../routes/booksRoutes.js';
import { customersRouter } from '../routes/customersRoutes.js';
import { ordersRouter } from '../routes/ordersRoutes.js';

export const routes = app => {
  app.use(usuariosRouter);
  app.use(booksRouter);
  app.use(customersRouter);
  app.use(ordersRouter);
  app.use(funcionariosRouter);
  app.use(estoqueRouter);
};
