import { Gallery, User } from '@common/interfaces';
import {
  anotherUserLoginMock,
  anotherUserMock,
  galleryMock,
  galleryUpdateMock,
  galleryUpdateWithAllowedUsersMock,
  galleryWithAllowedUsersMock,
  userLoginMock,
  userMock,
} from '@common/tests/mock';
import { Application } from 'express';
import supertest, { SuperAgentTest } from 'supertest';

import { AuthController } from '@auth/auth.controller';
import { App } from '@core/app';
import { deleteAllUsers } from '@lib/prisma';
import { userService } from '@user/user.service';

import { GalleryController } from './gallery.controller';
import { galleryService } from './gallery.service';

describe('Gallery Controller', () => {
  let app: Application;

  beforeAll(async () => {
    await deleteAllUsers();

    const newApp = new App([new AuthController(), new GalleryController()]);
    await newApp.init();

    app = newApp.getServer();
  });

  describe('After one user created and logged in', () => {
    let user: User;
    let agent: SuperAgentTest;

    beforeAll(async () => {
      user = await userService.create(userMock);
    });

    afterAll(async () => {
      if (user) await userService.delete(user.id);
    });

    beforeEach(async () => {
      agent = supertest.agent(app);
      await agent.post('/api/auth/login').send(userLoginMock);
    });

    it('Should check input validation when creating one', async () => {
      await agent
        .post('/api/galleries')
        .send({
          name: '',
          description: '',
          public: true,
          allowedUsers: [],
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'Gallery',
          description: '',
          public: undefined,
          allowedUsers: [],
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'Gallery',
          description: '',
          public: true,
          allowedUsers: undefined,
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'G',
          description: '',
          public: true,
          allowedUsers: [],
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'G'.repeat(51),
          description: '',
          public: true,
          allowedUsers: [],
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'Gallery<?>',
          description: '',
          public: true,
          allowedUsers: [],
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'Gallery',
          description: 'description<?>',
          public: true,
          allowedUsers: [],
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'Gallery',
          description: 'd'.repeat(501),
          public: true,
          allowedUsers: [],
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'Gallery',
          description: '',
          public: 'true',
          allowedUsers: [],
        })
        .expect(400);

      await agent
        .post('/api/galleries')
        .send({
          name: 'Gallery',
          description: '',
          public: true,
          allowedUsers: ['fulano@'],
        })
        .expect(400);
    });

    describe('Creating one', () => {
      let gallery: Gallery;

      afterAll(async () => {
        if (gallery) await galleryService.delete(gallery.id);
      });

      it('Should create one', async () => {
        const createResponse = await agent
          .post('/api/galleries')
          .send(galleryWithAllowedUsersMock);

        gallery = createResponse.body as Gallery;
        expect(gallery).toMatchObject(galleryMock);
      });
    });

    it('Should delete one', async () => {
      const gallery = await galleryService.create(
        user.id,
        galleryWithAllowedUsersMock
      );

      const deleteResponse = await agent.delete(`/api/galleries/${gallery.id}`);
      expect(deleteResponse.body).toMatchObject(galleryMock);
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

      const res = await agent.put('/api/galleries').send({
        galleryIds: [gallery1.id, gallery2.id],
      });

      expect(res.body).toMatchObject({ count: 2 });
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
        if (gallery) await galleryService.delete(gallery.id);
      });

      it('Should get all', async () => {
        const res = await agent.get('/api/galleries');

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject(galleryMock);
      });

      it('Should get all galleries only with preview pictures', async () => {
        const res = await agent.get('/api/galleries?mode=preview');

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject({ ...galleryMock, pictures: [] });
      });

      it('Should get all galleries only with id and name', async () => {
        const res = await agent.get('/api/galleries?mode=minimal');

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject({
          id: gallery.id,
          name: gallery.name,
        });

        expect(res.body[0]).not.toHaveProperty('description');
        expect(res.body[0]).not.toHaveProperty('public');
        expect(res.body[0]).not.toHaveProperty('createdAt');
        expect(res.body[0]).not.toHaveProperty('updatedAt');
        expect(res.body[0]).not.toHaveProperty('userId');
      });

      it('Should get a public one with pictures', async () => {
        const res = await agent.get(
          `/api/galleries/${gallery.id}?mode=preview`
        );

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
          gallery: galleryMock,
          pictures: [],
        });
      });

      it('Should get allowed users in one', async () => {
        const res = await agent.get(
          `/api/galleries/${gallery.id}/allowed-users`
        );

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(0);
      });

      it('Should check input validation when updating one', async () => {
        // Validation is exactly the same as when creating one
        await agent
          .put(`/api/galleries/${gallery.id}`)
          .send({
            name: '',
            description: '',
            public: true,
            allowedUsers: [],
          })
          .expect(400);
      });

      it('Should update one', async () => {
        const res = await agent
          .put(`/api/galleries/${gallery.id}`)
          .send(galleryUpdateWithAllowedUsersMock);

        expect(res.body).toMatchObject(galleryUpdateMock);
      });
    });

    describe('After another user created and logged in', () => {
      let anotherUser: User;
      let anotherAgent: SuperAgentTest;

      beforeAll(async () => {
        anotherUser = await userService.create(anotherUserMock);
      });

      afterAll(async () => {
        if (anotherUser) await userService.delete(anotherUser.id);
      });

      beforeEach(async () => {
        anotherAgent = supertest.agent(app);
        await anotherAgent.post('/api/auth/login').send(anotherUserLoginMock);
      });

      describe('Getting private one from allowed user', () => {
        let gallery: Gallery;

        beforeAll(async () => {
          gallery = await galleryService.create(user.id, {
            ...galleryMock,
            public: false,
            allowedUsers: ['fulana@example.com'],
          });
        });

        afterAll(async () => {
          if (gallery) await galleryService.delete(gallery.id);
        });

        it('Should pass', async () => {
          const res = await anotherAgent.get(`/api/galleries/${gallery.id}`);

          expect(res.statusCode).toBe(200);
        });
      });

      describe('Attempting from not authorized user', () => {
        let gallery: Gallery;

        beforeAll(async () => {
          gallery = await galleryService.create(user.id, {
            ...galleryWithAllowedUsersMock,
            public: false,
          });
        });

        afterAll(async () => {
          if (gallery) await galleryService.delete(gallery.id);
        });

        it('Should not get a private one', async () => {
          const res = await anotherAgent.get(`/api/galleries/${gallery.id}`);
          expect(res.statusCode).toBe(403);
        });

        it('Should not get allowed users in one', async () => {
          const res = await anotherAgent.get(
            `/api/galleries/${gallery.id}/allowed-users`
          );
          expect(res.statusCode).toBe(404);
        });

        it('Should not update one', async () => {
          const res = await anotherAgent
            .put(`/api/galleries/${gallery.id}`)
            .send(galleryUpdateWithAllowedUsersMock);

          expect(res.statusCode).toBe(404);
        });

        it('Should not delete one', async () => {
          const res = await anotherAgent.delete(`/api/galleries/${gallery.id}`);
          expect(res.statusCode).toBe(404);
        });

        it('Should not delete many', async () => {
          const res = await anotherAgent.put('/api/galleries').send({
            galleryIds: [gallery.id],
          });
          expect(res.body).toMatchObject({ count: 0 });
        });
      });
    });
  });
});
