import express, { Express } from 'express';
import setupStaticFiles from '@main/config/static-files';
import setupMiddleware from '@main/config/middlewares';

export const setupApp = async (): Promise<Express> => {
  const app: Express = express();
  setupStaticFiles(app);
  setupMiddleware(app);

  return app;
};
