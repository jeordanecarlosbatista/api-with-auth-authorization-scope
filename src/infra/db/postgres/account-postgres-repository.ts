import { AddAccountRepository } from '@data/protocols/db/account';
import { PostgresHelper } from '@infra/db/postgres';

export class AccountPostgresRepository implements AddAccountRepository {
  async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    await PostgresHelper.client.account.create({
      data,
    });
    return true;
  }
}
