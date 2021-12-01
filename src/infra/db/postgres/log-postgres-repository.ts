import { LogErrorRepository } from '@data/protocols';
import { PostgresHelper } from '@infra/db/postgres';

export class LogPostgresRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    try {
      await PostgresHelper.client.log.create({ data: { stack } });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}
