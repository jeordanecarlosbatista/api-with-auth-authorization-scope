import { PostgresHelper } from '@infra/db/postgres';

import env from '@main/config/env';

PostgresHelper.connect().then(async () => {
  const { setupApp } = await import('./config/app');
  const app = await setupApp();
  // eslint-disable-next-line no-console
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
});
