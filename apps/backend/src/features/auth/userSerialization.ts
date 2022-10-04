import passport from 'passport';

import { userService } from '@user/user.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: string;
    }
  }
}

export function initializeUserSerialization() {
  passport.serializeUser((userFromSession, done) => {
    done(null, userFromSession.id);
  });

  passport.deserializeUser(async (userId, done) => {
    const user = await userService.getOne(userId as string);
    done(null, user as Express.User);
  });
}
