import { accountSchema } from './schemas/account-schema';
import { errorSchema } from './schemas/error-schema';
import { loginParamsSchema } from './schemas/login-params-schema';
import { signUpParamsSchema } from './schemas/signup-params-schema';

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  error: errorSchema,
};
