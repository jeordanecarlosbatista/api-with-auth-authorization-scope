import faker from 'faker';
import { AddAccount, Authentication, LoadAccountByToken } from '@domain/usecases';

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params | undefined;

  result: AddAccount.Result = {
    id: faker.datatype.number(),
    accessToken: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.findName(),
  };

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params;
    return this.result;
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params | undefined;

  result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  };

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string | undefined;

  role: string | undefined;

  result: LoadAccountByToken.Result | null = {
    id: faker.datatype.number(),
  };

  async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result | null> {
    this.accessToken = accessToken;
    this.role = role;
    return this.result;
  }
}
