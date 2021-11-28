import faker from 'faker';
import { AddAccount } from '@domain/usecases';

export const mockAddAccountParams = (): AddAccount.Params => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
});
