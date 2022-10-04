import { z } from 'zod';

import { deleteManyGalleriesSchema, gallerySchema } from './gallery.schema';

export type GalleryDto = z.infer<typeof gallerySchema>;
export type DeleteManyGalleriesDto = z.infer<typeof deleteManyGalleriesSchema>;
