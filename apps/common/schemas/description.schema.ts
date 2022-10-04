import { z } from 'zod';

export const descriptionSchema = z
  .string()
  .trim()
  .max(500, 'Must not be longer than 500 characters');
