import passport from 'passport';
import {
  IOAuth2StrategyOption,
  OAuth2Strategy as GoogleOAuth2Strategy,
  Profile,
  VerifyFunction,
} from 'passport-google-oauth';

import { userService } from '@user/user.service';
import { getEnv } from '@utils/env';

export function initializeGoogleOAuth2Strategy() {
  const { GOOGLE_OAUTH2_CLIENT_ID, GOOGLE_OAUTH2_CLIENT_SECRET } = getEnv();

  const options: IOAuth2StrategyOption = {
    clientID: GOOGLE_OAUTH2_CLIENT_ID || '',
    clientSecret: GOOGLE_OAUTH2_CLIENT_SECRET || '',
    callbackURL: '/api/auth/google/callback',
  };

  const verify = async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyFunction
  ) => {
    const { id, displayName, emails } = profile;

    const userByGoogleId = await userService.getOneByGoogleId(id);
    if (userByGoogleId) return done(null, userByGoogleId);

    try {
      const email = emails && emails[0].value;

      const newUser = await userService.createWithGoogleOAuth2({
        googleId: id,
        name: displayName,
        email: email as string,
      });

      done(null, newUser);
    } catch (err) {
      done(err, null);
    }
  };

  passport.use(new GoogleOAuth2Strategy(options, verify));
}
