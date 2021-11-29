import { PostgresHelper } from '@infra/db/postgres';
import { AccountPostgresRepository } from '@infra/db/postgres/account-postgres-repository';
import { mockAddAccountParams } from '@test/domain/mocks';
import faker from 'faker';

const makeSut = (): AccountPostgresRepository => new AccountPostgresRepository();

describe('AccountPostgresRepository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect();
  });

  afterAll(async () => {
    await PostgresHelper.disconnect();
  });

  beforeEach(async () => {
    await PostgresHelper.client.account.deleteMany();
  });

  describe('add', () => {
    test('should return an account on sucess', async () => {
      const sut = makeSut();
      const account = await sut.add(mockAddAccountParams());
      expect(account).toBeTruthy();
    });
  });

  describe('loadByEmail', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await sut.add(addAccountParams);
      const account = await sut.loadByEmail(addAccountParams.email);
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe(addAccountParams.name);
      expect(account.password).toBe(addAccountParams.password);
    });

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut();
      const account = await sut.loadByEmail(faker.internet.email());
      expect(account).toBeFalsy();
    });
  });

  describe('checkByEmail', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await sut.add(addAccountParams);
      const exists = await sut.checkByEmail(addAccountParams.email);
      expect(exists).toBe(true);
    });

    test('Should return false if email is not valid', async () => {
      const sut = makeSut();
      const exists = await sut.checkByEmail(faker.internet.email());
      expect(exists).toBe(false);
    });
  });

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const sut = makeSut();
      const { email } = await sut.add(mockAddAccountParams());
      const fakeAccount = await sut.loadByEmail(email);
      expect(fakeAccount.accessToken).toBeFalsy();
      const accessToken = faker.datatype.uuid();
      await sut.updateAccessToken(fakeAccount.id, accessToken);
      const account: any = await sut.loadByEmail(fakeAccount.email);
      expect(account).toBeTruthy();
      expect(account.accessToken).toBe(accessToken);
    });
  });
});
