import faker from 'faker';
import { LogPostgresRepository } from '@infra/db/postgres/log-postgres-repository';
import { PostgresHelper } from '@infra/db/postgres';

const makeSut = (): LogPostgresRepository => new LogPostgresRepository();

describe('LogMongoRepository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect();
  });

  afterAll(async () => {
    await PostgresHelper.disconnect();
  });

  beforeEach(async () => {
    await PostgresHelper.client.log.deleteMany();
  });

  test('Should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError(faker.random.words());
    const count = await PostgresHelper.client.log.count();
    expect(count).toBe(1);
  });
});
