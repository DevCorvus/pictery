import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .email()
  .max(200, 'Must not be longer than 200 characters');
