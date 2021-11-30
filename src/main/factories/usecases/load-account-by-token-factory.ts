import env from '@main/config/env';
import { LoadAccountByToken } from '@domain/usecases';
import { DbLoadAccountByToken } from '@data/usecases';
import { AccountPostgresRepository } from '@infra/db/postgres';
import { JwtAdapter } from '@infra/cryptography';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountPostgresRepository);
};
