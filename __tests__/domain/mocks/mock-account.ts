import faker from 'faker';
import { AddAccount, Authentication } from '@domain/usecases';

export const mockAddAccountParams = (): AddAccount.Params => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
