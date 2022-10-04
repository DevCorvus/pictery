import { Gallery, Picture, User } from '@common/interfaces';
import {
  galleryWithAllowedUsersMock,
  pictureMock,
  pictureUpdateMock,
  userMock,
} from '@common/tests/mock';

import { galleryService } from '@gallery/gallery.service';
import { deleteAllUsers } from '@lib/prisma';
import { userService } from '@user/user.service';

import { pictureService } from './picture.service';

describe('Picture Service', () => {
  let user: User;
  let gallery: Gallery;

  beforeAll(async () => {
    await deleteAllUsers();

    user = await userService.create(userMock);
    gallery = await galleryService.create(user.id, galleryWithAllowedUsersMock);
  });

  afterAll(async () => {
    if (user) await userService.delete(user.id);
  });

  describe('Creating one', () => {
    let picture: Picture;

    afterAll(async () => {
      if (picture) await pictureService.delete(picture.id);
    });

    it('Should pass', async () => {
      picture = await pictureService.create(user.id, pictureMock(gallery.id));
      expect(picture).toMatchObject(pictureMock(gallery.id));
    });
  });

  it('Should delete one', async () => {
    const picture = await pictureService.create(
      user.id,
      pictureMock(gallery.id)
    );

    const deletedPicture = await pictureService.delete(picture.id);
    expect(deletedPicture).toMatchObject(picture);

    const pictureExists = await pictureService.existsInUser(
      user.id,
      picture.id
    );
    expect(pictureExists).toBe(false);
  });

  it('Should delete many', async () => {
    const picture1 = await pictureService.create(
      user.id,
      pictureMock(gallery.id)
    );
    const picture2 = await pictureService.create(
      user.id,
      pictureMock(gallery.id)
    );

    const deletedPicturesCount = await pictureService.deleteMany(user.id, [
      picture1.id,
      picture2.id,
    ]);
    expect(deletedPicturesCount).toMatchObject({ count: 2 });
  });

  describe('After one created', () => {
    let picture: Picture;

    beforeAll(async () => {
      picture = await pictureService.create(user.id, pictureMock(gallery.id));
    });

    afterAll(async () => {
      if (picture) await pictureService.delete(picture.id);
    });

    it('Should get all picture keys from user', async () => {
      const pictures = await pictureService.getKeysFromAll(user.id);

      expect(pictures).toBeInstanceOf(Array);
      expect(pictures).toHaveLength(1);
      expect(pictures[0]).toMatchObject({ key: picture.key });
    });

    it('Should get many picture keys from user', async () => {
      const pictures = await pictureService.getKeysFromMany(user.id, [
        picture.id,
      ]);

      expect(pictures).toBeInstanceOf(Array);
      expect(pictures).toHaveLength(1);
      expect(pictures[0]).toMatchObject({ key: picture.key });
    });

    it('Should get one', async () => {
      const foundPicture = await pictureService.getOneByUser(
        user.id,
        picture.id
      );
      expect(foundPicture).toMatchObject(picture);
    });

    it('Should check picture existence from user', async () => {
      const pictureExists = await pictureService.existsInUser(
        user.id,
        picture.id
      );
      expect(pictureExists).toBe(true);
    });

    it('Should not get non-existing one', async () => {
      const foundPicture = await pictureService.getOneByUser(user.id, '4444');
      expect(foundPicture).toBe(null);
    });

    it('Should update one', async () => {
      const updatedPicture = await pictureService.update(
        picture.id,
        pictureUpdateMock(gallery.id)
      );
      expect(updatedPicture).toMatchObject(pictureUpdateMock(gallery.id));
    });

    it('Should move many', async () => {
      const movedPictures = await pictureService.moveMany(
        user.id,
        [picture.id],
        gallery.id
      );
      expect(movedPictures).toMatchObject({ count: 1 });
    });
  });
});
