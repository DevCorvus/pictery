import { User } from '@common/interfaces';
import { userMock, userWithGoogleMock } from '@common/tests/mock';

import { deleteAllUsers } from '@lib/prisma';

import { userService } from './user.service';

describe('User service', () => {
  beforeAll(async () => {
    await deleteAllUsers();
  });

  describe('Creating one', () => {
    let user: User;

    afterEach(async () => {
      if (user) await userService.delete(user.id);
    });

    it('With password', async () => {
      user = await userService.create(userMock);

      expect(user).toMatchObject({
        email: userMock.email,
      });
      expect(user.googleId).toBeNull();
    });

    it('With Google OAuth2', async () => {
      user = await userService.createWithGoogleOAuth2(userWithGoogleMock);

      expect(user).toMatchObject({
        googleId: userWithGoogleMock.googleId,
        email: userWithGoogleMock.email,
      });
      expect(user.password).toBeNull();
    });
  });

  describe('After one created with password', () => {
    let user: User;

    beforeAll(async () => {
      user = await userService.create(userMock);
    });

    afterAll(async () => {
      if (user) await userService.delete(user.id);
    });

    it('Should check hashed password', async () => {
      expect(user.password).not.toBe(userMock.password);
    });

    it('Should get one', async () => {
      const foundUser = await userService.getOne(user.id);
      expect(foundUser).toMatchObject(user);
    });

    it('Should get email from one', async () => {
      const email = await userService.getEmailFromOne(user.id);
      expect(email).toBe(user.email);
    });

    it('Should get one by email', async () => {
      const foundUser = await userService.getOneByEmail(user.email);
      expect(foundUser).toMatchObject({
        email: userMock.email,
      });
    });

    it('Should check user existence by id', async () => {
      const userExists = await userService.existsById(user.id);
      expect(userExists).toBe(true);
    });

    it('Should check user existence by email', async () => {
      const userExists = await userService.existsByEmail(user.email);
      expect(userExists).toBe(true);
    });
  });

  describe('After one created with Google OAuth2', () => {
    let user: User;

    beforeAll(async () => {
      user = await userService.createWithGoogleOAuth2(userWithGoogleMock);
    });

    afterAll(async () => {
      if (user) await userService.delete(user.id);
    });

    it('Should get one by googleId', async () => {
      const foundUser = await userService.getOneByGoogleId(user.googleId || '');
      expect(foundUser).toMatchObject(user);
    });
  });

  it('Should delete one', async () => {
    const user = await userService.create(userMock);

    const deletedUser = await userService.delete(user.id);
    expect(deletedUser).toMatchObject(user);

    const userExists = await userService.existsById(user.id);
    expect(userExists).toBe(false);
  });
});
