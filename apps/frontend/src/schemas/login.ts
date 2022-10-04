import { toFormValidator } from '@vee-validate/zod';
import z from 'zod';


export const loginSchema = toFormValidator(
  z.object({
    email: z.string().trim(),
    password: z.string().trim(),
  })
);
