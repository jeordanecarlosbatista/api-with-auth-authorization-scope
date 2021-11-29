import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(
  {
    log: [
      {
        emit: 'stdout',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  },
);

export const PostgresHelper = {
  client: prisma,

  async connect(): Promise<void> {
    await prisma.$connect();
  },

  async disconnect(): Promise<void> {
    await prisma.$disconnect();
  },

};
