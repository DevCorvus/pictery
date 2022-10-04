import { User } from '@common/interfaces';
import { userLoginMock, userMock } from '@common/tests/mock';
import { Application } from 'express';
import supertest from 'supertest';

import { AuthController } from '@auth/auth.controller';
import { App } from '@core/app';
import { deleteAllUsers } from '@lib/prisma';
import { userService } from '@user/user.service';

import { GenericController } from './generic.controller';

describe('Generic Controller', () => {
  let app: Application;

  beforeAll(async () => {
    const newApp = new App([new GenericController(), new AuthController()]);
    await newApp.init();
    app = newApp.getServer();
  });

  describe('API status', () => {
    let user: User;

    beforeAll(async () => {
      await deleteAllUsers();
      user = await userService.create(userMock);
    });

    afterAll(async () => {
      if (user) await userService.delete(user.id);
    });

    it('Should pass', async () => {
      const res = await supertest(app).get('/api');
      expect(res.statusCode).toBe(200);
    });

    it('Should pass protected', async () => {
      const agent = supertest.agent(app);

      const res1 = await agent.get('/api/protected');
      expect(res1.statusCode).toBe(401);

      await agent.post('/api/auth/login').send(userLoginMock);

      const res2 = await agent.get('/api/protected');
      expect(res2.statusCode).toBe(200);
    });
  });
});
