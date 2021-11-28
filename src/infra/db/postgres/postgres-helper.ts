import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PostgresHelper = {
  client: prisma,

  async connect(): Promise<void> {
    await prisma.$connect();
  },

  async disconnect(): Promise<void> {
    await prisma.$disconnect();
  },

};
