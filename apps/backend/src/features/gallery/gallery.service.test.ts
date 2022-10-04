import { Gallery, User } from '@common/interfaces';
import {
  galleryMock,
  galleryUpdateMock,
  galleryUpdateWithAllowedUsersMock,
  galleryWithAllowedUsersMock,
  userMock,
} from '@common/tests/mock';

import { deleteAllUsers } from '@lib/prisma';
import { userService } from '@user/user.service';

import { galleryService } from './gallery.service';

describe('Gallery Service', () => {
  let user: User;

  beforeAll(async () => {
    await deleteAllUsers();
    user = await userService.create(userMock);
  });

  afterAll(async () => {
    await userService.delete(user.id);
  });

  it('Should get all', async () => {
    const galleries = await galleryService.getAll(user.id);

    expect(galleries).toBeInstanceOf(Array);
    expect(galleries).toHaveLength(0);
  });

  it('Should get all with only id and name', async () => {
    const galleries = await galleryService.getAllWithOnlyIdAndName(user.id);

    expect(galleries).toBeInstanceOf(Array);
    expect(galleries).toHaveLength(0);
  });

  it('Should get all with preview pictures', async () => {
    const galleries = await galleryService.getAllWithPreviewPictures(user.id);

    expect(galleries).toBeInstanceOf(Array);
    expect(galleries).toHaveLength(0);
  });

  it('Should return null for a non-existing one', async () => {
    const foundGallery = await galleryService.getOne('4444');
    expect(foundGallery).toBe(null);
  });

  it('Should get picture keys from many', async () => {
    const picturesKeys = await galleryService.getPicturesKeysFromMany(
      user.id,
      []
    );

    expect(picturesKeys).toBeInstanceOf(Array);
    expect(picturesKeys).toHaveLength(0);
  });

  describe('Creating one', () => {
    let gallery: Gallery;

    afterAll(async () => {
      if (gallery) await galleryService.delete(gallery.id);
    });

    it('Should pass', async () => {
      gallery = await galleryService.create(
        user.id,
        galleryWithAllowedUsersMock
      );
      expect(gallery).toMatchObject(galleryMock);
    });
  });

  it('Should delete one', async () => {
    const gallery = await galleryService.create(
      user.id,
      galleryWithAllowedUsersMock
    );

    const deletedGallery = await galleryService.delete(gallery.id);
    expect(deletedGallery).toMatchObject(gallery);

    const galleryExists = await galleryService.existsInUser(
      user.id,
      deletedGallery.id
    );
    expect(galleryExists).toBe(false);
  });

  it('Should delete many', async () => {
    const gallery1 = await galleryService.create(
      user.id,
      galleryWithAllowedUsersMock
    );
    const gallery2 = await galleryService.create(
      user.id,
      galleryWithAllowedUsersMock
    );

    const deletedGalleries = await galleryService.deleteMany(user.id, [
      gallery1.id,
      gallery2.id,
    ]);

    expect(deletedGalleries).toMatchObject({ count: 2 });
  });

  describe('After one created', () => {
    let gallery: Gallery;

    beforeEach(async () => {
      gallery = await galleryService.create(
        user.id,
        galleryWithAllowedUsersMock
      );
    });

    afterEach(async () => {
      await galleryService.delete(gallery.id);
    });

    it('Should check its existence', async () => {
      const galleryExists = await galleryService.existsInUser(
        user.id,
        gallery.id
      );
      expect(galleryExists).toBe(true);
    });

    it('Should get it', async () => {
      const foundGallery = await galleryService.getOne(gallery.id);
      expect(foundGallery).toMatchObject(gallery);
    });

    it('Should get its pictures', async () => {
      const pictures = await galleryService.getPicturesFromOne(gallery.id);

      expect(pictures).toBeInstanceOf(Array);
      expect(pictures).toHaveLength(0);
    });

    it('Should get its picture keys', async () => {
      const picturesKeys = await galleryService.getPicturesKeysFromOne(
        gallery.id
      );

      expect(picturesKeys).toMatchObject({ pictures: [] });
    });

    it('Should get its allowed users', async () => {
      const allowedUsers = await galleryService.getAllowedUsersFromOne(
        gallery.id
      );
      expect(allowedUsers).toBeInstanceOf(Array);
      expect(allowedUsers).toHaveLength(0);
    });

    it('Should not get it if user not allowed', async () => {
      const isAllowed = await galleryService.existsInAllowedUsers(
        gallery.id,
        '4444'
      );
      expect(isAllowed).toBe(false);
    });

    it('Should get count from user', async () => {
      const galleriesCount = await galleryService.getCount(user.id);
      expect(galleriesCount).toBe(1);
    });

    it('Should be updated', async () => {
      const updatedGallery = await galleryService.update(
        gallery.id,
        galleryUpdateWithAllowedUsersMock
      );
      expect(updatedGallery).toMatchObject(galleryUpdateMock);
    });
  });
});
