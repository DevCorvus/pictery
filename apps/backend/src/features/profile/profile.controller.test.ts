import { User } from '@common/interfaces';
import { profileMock, userLoginMock, userMock } from '@common/tests/mock';
import request, { SuperAgentTest } from 'supertest';

import { AuthController } from '@auth/auth.controller';
import { App } from '@core/app';
import { deleteAllUsers } from '@lib/prisma';
import { userService } from '@user/user.service';

import { ProfileController } from './profile.controller';

describe('Profile Controller', () => {
  let user: User;
  let agent: SuperAgentTest;

  beforeAll(async () => {
    await deleteAllUsers();

    const newApp = new App([new AuthController(), new ProfileController()]);
    await newApp.init();
    const app = newApp.getServer();

    agent = request.agent(app);

    user = await userService.create(userMock);
    await agent.post('/api/auth/login').send(userLoginMock);
  });

  afterAll(async () => {
    if (user) await userService.delete(user.id);
  });

  it('Should get one', async () => {
    const res = await agent.get('/api/profile');

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(profileMock);
  });

  it('Should get one by userId', async () => {
    const res = await agent.get(`/api/profile/${user.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(profileMock);
  });
});
