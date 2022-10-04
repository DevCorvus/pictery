import { RateLimiterMemory } from 'rate-limiter-flexible';

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export const loginLimiter = new RateLimiterMemory({
  keyPrefix: 'too_many_login_attempts',
  points: 100,
  duration: ONE_DAY_IN_SECONDS,
});
