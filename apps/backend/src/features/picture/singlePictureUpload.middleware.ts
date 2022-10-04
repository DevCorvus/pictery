import { ONE_MEGABYTE } from '@common/constants';
import multer, { diskStorage } from 'multer';


const allowedSubtypes = [
  'apng',
  'avif',
  'gif',
  'jpeg',
  'png',
  'svg+xml',
  'webp',
];

export const singlePictureUpload = multer({
  storage: diskStorage({
    destination: 'tmp/uploads',
  }),
  fileFilter: (req, file, done) => {
    const [type, subtype] = file.mimetype.split('/');

    if (type === 'image' && allowedSubtypes.includes(subtype)) {
      done(null, true);
    } else {
      done(null, false);
    }
  },
  limits: {
    fileSize: ONE_MEGABYTE,
  },
}).single('image');
