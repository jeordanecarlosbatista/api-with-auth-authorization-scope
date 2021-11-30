import { hash } from 'bcrypt';
import { Express } from 'express';
import request from 'supertest';
import { setupApp } from '@main/config/app';
import { PostgresHelper } from '@infra/db/postgres';

let app: Express;

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
    await PostgresHelper.client.$connect();
  });

  afterAll(async () => {
    await PostgresHelper.client.$disconnect();
  });

  beforeEach(async () => {
    await PostgresHelper.client.account.deleteMany({});
  });

  describe('POST /signup', () => {
    test('Should return 201 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Jeordane',
          email: 'jeordane.batista@live.com',
          password: '123',
        })
        .expect(201);
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Jeordane',
          email: 'jeordane.batista@live.com',
          password: '123',
        })
        .expect(403);
    });
  });

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12);
      await PostgresHelper.client.account.create({
        data: {
          name: 'Jeordane',
          email: 'jeordane.batista@live.com',
          password,
        },
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'jeordane.batista@live.com',
          password: '123',
        })
        .expect(200);
    });

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'jeordane.batista@live.com',
          password: '123',
        })
        .expect(401);
    });
  });
});
