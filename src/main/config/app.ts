import express, { Express } from 'express';
import setupStaticFiles from '@main/config/static-files';
import setupMiddleware from '@main/config/middlewares';
import setupSwagger from '@main/config/swagger';
import setupRoutes from '@main/config/routes';

export const setupApp = async (): Promise<Express> => {
  const app: Express = express();
  setupStaticFiles(app);
  setupSwagger(app);
  setupMiddleware(app);
  setupRoutes(app);

  return app;
};
