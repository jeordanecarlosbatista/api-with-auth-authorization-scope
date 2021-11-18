import express, { Express } from 'express';

export const setupApp = async (): Promise<Express> => {
  const app: Express = express();

  return app;
};
