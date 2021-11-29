import faker from 'faker';
import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  UpdateAccessTokenRepository,
  CheckAccountByEmailRepository,
} from '@data/protocols';

export class AddAccountRepositorySpy implements AddAccountRepository {
  params?: AddAccountRepository.Params;

  result: AddAccountRepository.Result = {
    accessToken: faker.datatype.uuid(),
    email: faker.internet.email(),
    id: faker.datatype.number(),
    name: faker.name.findName(),
  };

  async add(params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email?: string;

  result: LoadAccountByEmailRepository.Result = {
    accessToken: faker.datatype.uuid(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    id: faker.datatype.number(),
    name: faker.name.findName(),
  };

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email?: string;

  result = false;

  async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  token?: string;

  role?: string;

  result = {
    id: faker.datatype.uuid(),
  };

  async loadByToken(token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token;
    this.role = role;
    return this.result;
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id?: number;

  token?: string;

  async updateAccessToken(id: number, token: string): Promise<void> {
    this.id = id;
    this.token = token;
  }
}
