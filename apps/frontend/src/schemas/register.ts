
import { emailSchema, nameSchema, passwordSchema } from '@common/schemas';
import { toFormValidator } from '@vee-validate/zod';
import z from 'zod';

export const registerSchema = toFormValidator(
  z
    .object({
      name: nameSchema,
      email: emailSchema,
      password: passwordSchema,
      passwordConfirm: z.string().trim(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    })
);
