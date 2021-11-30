import { LogControllerDecorator } from '@main/decorators';
import { LogPostgresRepository } from '@infra/db/postgres';
import { Controller } from '@presentation/protocols';

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogPostgresRepository();

  return new LogControllerDecorator(controller, logMongoRepository);
};
