import { emailSchema, nameSchema, passwordSchema } from '@common/schemas';
import { z } from 'zod';


export const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
