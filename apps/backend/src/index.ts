import { App } from './core/app';
import { AuthController } from './features/auth/auth.controller';
import { GalleryController } from './features/gallery/gallery.controller';
import { GenericController } from './features/generic/generic.controller';
import { PictureController } from './features/picture/picture.controller';
import { ProfileController } from './features/profile/profile.controller';
import { UserController } from './features/user/user.controller';

(async () => {
  const app = new App([
    new GenericController(),
    new AuthController(),
    new UserController(),
    new ProfileController(),
    new GalleryController(),
    new PictureController(),
  ]);

  await app.init();

  app.listen();
})();
