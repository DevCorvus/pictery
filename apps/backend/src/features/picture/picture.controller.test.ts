import path from 'path';

import { Gallery, Picture, User } from '@common/interfaces';
import {
  anotherUserLoginMock,
  anotherUserMock,
  galleryWithAllowedUsersMock,
  pictureMock,
  pictureUpdateMock,
  userLoginMock,
  userMock,
} from '@common/tests/mock';
import { Application } from 'express';
import supertest, { SuperAgentTest } from 'supertest';

import { AuthController } from '@auth/auth.controller';
import { App } from '@core/app';
import { galleryService } from '@gallery/gallery.service';
import { deleteAllUsers } from '@lib/prisma';
import { userService } from '@user/user.service';

import { PictureController } from './picture.controller';
import { pictureService } from './picture.service';
import { pictureStorageService } from './picture.storage.service';

describe('Picture Controller', () => {
  let app: Application;

  beforeAll(async () => {
    await deleteAllUsers();

    const newApp = new App([new AuthController(), new PictureController()]);
    await newApp.init();

    app = newApp.getServer();
  });

  describe('After one user with two galleries created and logged in', () => {
    let user: User;
    let agent: SuperAgentTest;
    let gallery: Gallery;
    let anotherGallery: Gallery;

    beforeAll(async () => {
      user = await userService.create(userMock);

      gallery = await galleryService.create(
        user.id,
        galleryWithAllowedUsersMock
      );

      anotherGallery = await galleryService.create(
        user.id,
        galleryWithAllowedUsersMock
      );
    });

    afterAll(async () => {
      if (user) await userService.delete(user.id);
    });

    beforeEach(async () => {
      agent = supertest.agent(app);
      await agent.post('/api/auth/login').send(userLoginMock);
    });

    it('Should check input validation when creating one', async () => {
      const imageFilePath = path.join(
        process.cwd(),
        '../common/tests/static',
        'pixel-earth.jpg'
      );
      const notImageFilePath = path.join(
        process.cwd(),
        '../common/tests/static',
        'document.txt'
      );
      const imageTooBigFilePath = path.join(
        process.cwd(),
        '../common/tests/static',
        'pixel-earth-big.jpg'
      );

      const uuid = '3984e889-2fa2-4a8c-9ede-e78d5f2fd9c6';

      await agent
        .post('/api/pictures')
        .field('galleryId', 'id')
        .field('name', 'Picture')
        .field('description', '')
        .attach('image', imageFilePath)
        .expect(400);

      await agent
        .post('/api/pictures')
        .field('galleryId', uuid)
        .field('name', 'Picture<?>')
        .field('description', '')
        .attach('image', imageFilePath)
        .expect(400);

      await agent
        .post('/api/pictures')
        .field('galleryId', uuid)
        .field('name', 'P')
        .field('description', '')
        .attach('image', imageFilePath)
        .expect(400);

      await agent
        .post('/api/pictures')
        .field('galleryId', uuid)
        .field('name', 'P'.repeat(51))
        .field('description', '')
        .attach('image', imageFilePath)
        .expect(400);

      await agent
        .post('/api/pictures')
        .field('galleryId', uuid)
        .field('name', 'Picture')
        .field('description', 'description<?>')
        .attach('image', imageFilePath)
        .expect(400);

      await agent
        .post('/api/pictures')
        .field('galleryId', uuid)
        .field('name', 'Picture')
        .field('description', 'd'.repeat(501))
        .attach('image', imageFilePath)
        .expect(400);

      await agent
        .post('/api/pictures')
        .field('galleryId', uuid)
        .field('name', 'Picture')
        .field('description', '')
        .attach('image', notImageFilePath)
        .expect(400);

      await agent
        .post('/api/pictures')
        .field('galleryId', uuid)
        .field('name', 'Picture')
        .field('description', '')
        .attach('image', imageTooBigFilePath)
        .expect(500);
    });

    describe('Creating one', () => {
      let picture: Picture;

      afterAll(async () => {
        if (picture) {
          await pictureStorageService.delete(picture.key);
          await pictureService.delete(picture.id);
        }
      });

      it('Should pass', async () => {
        const filePath = path.join(
          process.cwd(),
          '../common/tests/static',
          'pixel-earth.jpg'
        );

        const { galleryId, name, description } = pictureMock(gallery.id);

        const res = await agent
          .post('/api/pictures')
          .field('galleryId', galleryId)
          .field('name', name)
          .field('description', description)
          .attach('image', filePath);

        picture = res.body as Picture;

        expect(res.body).toMatchObject({ galleryId, name, description });
      });
    });

    it('Should delete one', async () => {
      const picture = await pictureService.create(
        user.id,
        pictureMock(gallery.id)
      );

      const res = await agent.delete(`/api/pictures/${picture.id}`);
      expect(res.body).toMatchObject(pictureMock(gallery.id));
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

      const res = await agent.put('/api/pictures/delete').send({
        pictureIds: [picture1.id, picture2.id],
      });

      expect(res.body).toMatchObject({ count: 2 });
    });

    describe('After one created', () => {
      let picture: Picture;

      beforeAll(async () => {
        picture = await pictureService.create(user.id, pictureMock(gallery.id));
      });

      afterAll(async () => {
        if (picture) await pictureService.delete(picture.id);
      });

      it('Should check input validation when updating one', async () => {
        // Validation is exactly the same as when creating one
        await agent
          .put(`/api/pictures/${picture.id}`)
          .send({
            galleryId: gallery.id,
            name: '',
            description: 'now i have a description',
          })
          .expect(400);
      });

      it('Should update and move one', async () => {
        const res = await agent
          .put(`/api/pictures/${picture.id}`)
          .send(pictureUpdateMock(gallery.id));

        expect(res.body).toMatchObject(pictureUpdateMock(gallery.id));
      });

      it('Should move many', async () => {
        const res = await agent.put('/api/pictures/move').send({
          galleryId: anotherGallery.id,
          pictureIds: [picture.id],
        });

        expect(res.body).toMatchObject({ count: 1 });
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

        describe('Attempting from not authorized user', () => {
          it('Should not update and move one', async () => {
            const res = await anotherAgent
              .put(`/api/pictures/${picture.id}`)
              .send(pictureUpdateMock(gallery.id));

            expect(res.statusCode).toBe(404);
          });

          it('Should not move many', async () => {
            const res = await anotherAgent.put('/api/pictures/move').send({
              galleryId: anotherGallery.id,
              pictureIds: [picture.id],
            });
            expect(res.body).toMatchObject({ count: 0 });
          });

          it('Should not delete one', async () => {
            const res = await anotherAgent.delete(
              `/api/pictures/${picture.id}`
            );
            expect(res.statusCode).toBe(404);
          });

          it('Should not delete many', async () => {
            const res = await anotherAgent.put('/api/pictures/delete').send({
              pictureIds: [picture.id],
            });
            expect(res.body).toMatchObject({ count: 0 });
          });
        });
      });
    });
  });
});
