import { z } from 'zod';

import {
  deleteManyPicturesSchema,
  moveManyPicturesSchema,
  pictureSchema,
} from './picture.schema';

export type PictureDto = z.infer<typeof pictureSchema>;
export type MoveManyPicturesDto = z.infer<typeof moveManyPicturesSchema>;
export type DeleteManyPicturesDto = z.infer<typeof deleteManyPicturesSchema>;

export interface StorePictureDto extends PictureDto {
  url: string;
  key: string;
}
