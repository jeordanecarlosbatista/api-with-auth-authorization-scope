require('dotenv').config();

export default {
  jwtSecret: 'abcde',
  port: process.env.PORT || 3333,
  postgresUrl: process.env.DATABASE_URL || 'postgres://admin:admin@localhost:5432/helloworld',
};
