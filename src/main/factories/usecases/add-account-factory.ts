import { DbAddAccount } from '@data/usecases';
import { AddAccount } from '@domain/usecases';
import { AccountPostgresRepository } from '@infra/db/postgres';
import { BcryptAdapter } from '@infra/cryptography';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountPostgresRepository();
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository);
};
