import passport from 'passport';
import {
  IStrategyOptions,
  Strategy as LocalCredentialsStrategy,
  VerifyFunction,
} from 'passport-local';

import { loginLimiter } from '@auth/loginLimiter';
import { TooManyLoginAttemptsException } from '@exceptions/TooManyLoginAttemptsException';
import { userService } from '@user/user.service';
import { comparePassword } from '@utils/password';

export function initializeLocalCredentialsStrategy() {
  const options: IStrategyOptions = {
    usernameField: 'email',
  };

  const verify: VerifyFunction = async (email, password, done) => {
    try {
      const user = await userService.getOneByEmail(email);

      if (!user) return done(null, false);
      if (!user.password) return done(null, false);

      const passwordsMatch = await comparePassword(password, user.password);

      const loginLimit = await loginLimiter.get(email);

      if (!passwordsMatch) {
        if (loginLimit?.remainingPoints === 0) {
          return done(new TooManyLoginAttemptsException());
        } else {
          await loginLimiter.consume(email);
          return done(null, false);
        }
      }

      if (loginLimit?.consumedPoints) {
        await loginLimiter.delete(email);
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  };

  passport.use(new LocalCredentialsStrategy(options, verify));
}
