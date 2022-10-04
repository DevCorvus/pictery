
import { descriptionSchema, nameSchema } from '@common/schemas';
import { toFormValidator } from '@vee-validate/zod';
import z from 'zod';

export const nameAndDescriptionSchema = toFormValidator(
  z.object({
    name: nameSchema,
    description: descriptionSchema,
  })
);
