import { descriptionSchema, nameSchema } from '@common/schemas';
import { z } from 'zod';

import { uuidArray } from '@schemas/uuidArray';
import { allValuesInArrayAreUnique } from '@utils/array';

export const pictureSchema = z.object({
  galleryId: z.string().uuid(),
  name: nameSchema,
  description: descriptionSchema,
});

export const deleteManyPicturesSchema = z.object({
  pictureIds: uuidArray.refine((data) => allValuesInArrayAreUnique(data), {
    message: 'Repeated values',
    path: ['pictureIds'],
  }),
});

export const moveManyPicturesSchema = z.object({
  galleryId: z.string().uuid(),
  pictureIds: uuidArray.refine((data) => allValuesInArrayAreUnique(data), {
    message: 'Repeated values',
    path: ['pictureIds'],
  }),
});
