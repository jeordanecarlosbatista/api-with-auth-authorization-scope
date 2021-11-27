import { Pool } from 'pg';

export const PostgresHelper = {

  async connect(uri: string): Promise<void> {
    const pool = new Pool({
      connectionString: uri,
      max: 20,
      idleTimeoutMillis: 1000, // close idle clients after 1 second
      connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    });

    await pool.connect();
  },
};
