import { livrosRouter } from './livrosRoutes.js';

export const routes = app => {
  app.use(livrosRouter);
};