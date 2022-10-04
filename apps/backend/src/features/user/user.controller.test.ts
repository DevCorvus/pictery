import { User } from '@common/interfaces';
import { userLoginMock, userMock } from '@common/tests/mock';
import { Application } from 'express';
import supertest, { SuperTest, Test } from 'supertest';

import { AuthController } from '@auth/auth.controller';
import { App } from '@core/app';
import { deleteAllUsers } from '@lib/prisma';

import { UserController } from './user.controller';
import { userService } from './user.service';

describe('User Controller', () => {
  let app: Application;
  let request: SuperTest<Test>;

  beforeAll(async () => {
    await deleteAllUsers();

    const newApp = new App([new AuthController(), new UserController()]);
    await newApp.init();
    app = newApp.getServer();

    request = supertest(app);
  });

  it('Should check input validation when creating user', async () => {
    await request
      .post('/api/users')
      .send({
        name: '',
        email: 'fulano@example.com',
        password: '12345678',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'fulano',
        email: '',
        password: '12345678',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'fulano',
        email: 'fulano@example.com',
        password: '',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'f',
        email: 'fulano@example.com',
        password: '12345678',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'f'.repeat(51),
        email: 'fulano@example.com',
        password: '12345678',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'fulano<?>',
        email: 'fulano@example.com',
        password: '12345678',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'fulano',
        email: 'fulano@',
        password: '12345678',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'fulano',
        email: 'f'.repeat(201).concat('@example.com'),
        password: '12345678',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'fulano',
        email: 'fulano@example.com',
        password: '12345',
      })
      .expect(400);

    await request
      .post('/api/users')
      .send({
        name: 'fulano',
        email: 'fulano@example.com',
        password: '1'.repeat(101),
      })
      .expect(400);
  });

  describe('Creating one', () => {
    let user: User;

    afterAll(async () => {
      if (user) await userService.delete(user.id);
    });

    it('With password', async () => {
      const res = await request.post('/api/users').send(userMock);

      user = res.body;

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({ email: userMock.email });
    });
  });

  it('Should delete one', async () => {
    await userService.create(userMock);

    const agent = supertest.agent(app);
    await agent.post('/api/auth/login').send(userLoginMock);

    const res = await agent.delete('/api/users');

    expect(res.statusCode).toBe(204);
  });

  describe('After one created', () => {
    let user: User;

    beforeAll(async () => {
      user = await userService.create(userMock);
    });

    afterAll(async () => {
      if (user) await userService.delete(user.id);
    });

    it('Should be a conflict with repeated email', async () => {
      const res = await request.post('/api/users').send(userMock);
      expect(res.statusCode).toBe(409);
    });

    it('Should get email from one', async () => {
      const agent = supertest.agent(app);
      await agent.post('/api/auth/login').send(userLoginMock);

      const res = await agent.get('/api/users');
      expect(res.body).toBe(userMock.email);
    });
  });
});
