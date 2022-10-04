import { z } from 'zod';

export const trimmedAlphanumericString = z
  .string()
  .trim()
  .regex(/^[\w\-\s]*$/, 'Only alphanumeric characters');
