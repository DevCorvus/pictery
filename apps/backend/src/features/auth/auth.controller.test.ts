import { User } from '@common/interfaces';
import { userLoginMock, userMock } from '@common/tests/mock';
import { Application } from 'express';
import supertest, { SuperTest, Test } from 'supertest';


import { App } from '@core/app';
import { deleteAllUsers } from '@lib/prisma';
import { userService } from '@user/user.service';

import { AuthController } from './auth.controller';

describe('Auth controller', () => {
  let app: Application;
  let request: SuperTest<Test>;
  let user: User;

  beforeAll(async () => {
    await deleteAllUsers();

    const newApp = new App([new AuthController()]);
    await newApp.init();

    app = newApp.getServer();
    request = supertest(app);

    user = await userService.create(userMock);
  });

  afterAll(async () => {
    if (user) await userService.delete(user.id);
  });

  it('Should login locally', async () => {
    const res = await request.post('/api/auth/login').send(userLoginMock);
    expect(res.statusCode).toBe(200);
  });

  it('Should logout', async () => {
    const agent = supertest.agent(app);

    await agent.post('/api/auth/login').send(userLoginMock);

    const logoutResponse = await agent.post('/api/auth/logout');
    expect(logoutResponse.statusCode).toBe(204);
  });
});
