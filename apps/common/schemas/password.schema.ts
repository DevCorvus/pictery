import { z } from 'zod';

export const passwordSchema = z
  .string()
  .trim()
  .min(6, 'Must have at least 6 characters')
  .max(100, 'Must not be longer than 100 characters');
