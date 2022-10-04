import { descriptionSchema, emailSchema, nameSchema } from '@common/schemas';
import { z } from 'zod';

import { uuidArray } from '@schemas/uuidArray';
import { allValuesInArrayAreUnique } from '@utils/array';

export const gallerySchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  allowedUsers: z
    .array(emailSchema)
    .refine((data) => allValuesInArrayAreUnique(data), {
      message: 'Repeated values',
      path: ['allowedUsers'],
    }),
  public: z.boolean(),
});

export const deleteManyGalleriesSchema = z.object({
  galleryIds: uuidArray.refine((data) => allValuesInArrayAreUnique(data), {
    message: 'Repeated values',
    path: ['galleryIds'],
  }),
});
