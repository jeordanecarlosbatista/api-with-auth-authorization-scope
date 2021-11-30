import { badRequest } from './components/bad-request';
import { forbidden } from './components/forbidden';
import { notFound } from './components/not-found';
import { serverError } from './components/server-error';
import { unauthorized } from './components/unauthorized';
import { apiKeyAuthSchema } from './schemas/api-key-auth-schema';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
};
