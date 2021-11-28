import { PostgresHelper } from '@infra/db/postgres';
import { AccountPostgresRepository } from '@infra/db/postgres/account-postgres-repository';
import { mockAddAccountParams } from '@test/domain/mocks';

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
      const isValid = await sut.add(mockAddAccountParams());
      expect(isValid).toBe(true);
    });
  });
});
