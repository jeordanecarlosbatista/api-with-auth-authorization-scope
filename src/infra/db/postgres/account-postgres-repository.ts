import {
  AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository,
} from '@data/protocols/db/account';
import { PostgresHelper } from '@infra/db/postgres';

export class AccountPostgresRepository implements AddAccountRepository, LoadAccountByEmailRepository, CheckAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    return await PostgresHelper.client.account.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        accessToken: true,
      },
    }) as any;
  }

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    return await PostgresHelper.client.account.findFirst({
      where: {
        email: {
          contains: email,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        accessToken: true,
      },
    }) as any;
  }

  async checkByEmail(email: string): Promise<boolean> {
    const account = await PostgresHelper.client.account.findFirst({
      where: {
        email: {
          contains: email,
        },
      },
      select: {
        id: true,
        name: true,
        password: true,
      },
    });

    return account !== null;
  }

  async updateAccessToken(id: number, token: string): Promise<void> {
    await PostgresHelper.client.account.update({
      where: {
        id,
      },
      data: {
        accessToken: token,
      },
    });
  }

  async loadByToken(token: string, role?: string | undefined):Promise<LoadAccountByTokenRepository.Result> {
    return await PostgresHelper.client.account.findUnique({
      where: {
        accessToken: token,
      },
    }) as any;
  }
}
