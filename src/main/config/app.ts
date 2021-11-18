import express, { Express } from 'express';
import setupStaticFiles from '@main/config/static-files';

export const setupApp = async (): Promise<Express> => {
  const app: Express = express();
  setupStaticFiles(app);

  return app;
};
