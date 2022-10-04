import { trimmedAlphanumericString } from './partials/trimmedAlphanumericString';

export const nameSchema = trimmedAlphanumericString
  .min(2, 'Must have at least 2 characters')
  .max(50, 'Must not be longer than 50 characters');
