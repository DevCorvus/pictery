import { User } from '@common/interfaces';
import { profileMock, userMock } from '@common/tests/mock';

import { deleteAllUsers } from '@lib/prisma';
import { userService } from '@user/user.service';

import { profileService } from './profile.service';

describe('Profile Service', () => {
  let user: User;

  beforeAll(async () => {
    await deleteAllUsers();
    user = await userService.create(userMock);
  });

  afterAll(async () => {
    if (user) await userService.delete(user.id);
  });

  it('Should get profile from user', async () => {
    const profile = await profileService.getOne(user.id);
    expect(profile).toMatchObject(profileMock);
  });
});
