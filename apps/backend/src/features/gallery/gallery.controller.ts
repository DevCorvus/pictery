import { NextFunction, Request, Response } from 'express';

import { userIsAuthenticated } from '@auth/middlewares/userIsAuthenticated.middleware';
import { Router } from '@core/router';
import { BadRequestException } from '@exceptions/BadRequestException';
import { GalleryNotFoundException } from '@exceptions/GalleryNotFoundException';
import { NotAuthorizedException } from '@exceptions/NotAuthorizedException';
import { Controller } from '@interfaces/controller';
import { schemaValidation } from '@middlewares/schemaValidation.middleware';
import { storageLimiter } from '@middlewares/storageLimiter.middleware';
import { pictureStorageService } from '@picture/picture.storage.service';
import { userService } from '@user/user.service';
import { allValuesInArrayAreUnique } from '@utils/array';

import { DeleteManyGalleriesDto, GalleryDto } from './gallery.dto';
import { deleteManyGalleriesSchema, gallerySchema } from './gallery.schema';
import { galleryService } from './gallery.service';
import { galleryLimiter } from './galleryLimiter.middleware';

export class GalleryController implements Controller {
  public router = new Router('/galleries');

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.setMiddlewares(userIsAuthenticated);

    this.router.setRoute({
      method: 'GET',
      handler: this.getAll,
    });
    this.router.setRoute({
      method: 'GET',
      suffix: '/:galleryId',
      handler: this.getOneWithPictures,
    });
    this.router.setRoute({
      method: 'GET',
      suffix: '/:galleryId/allowed-users',
      handler: this.getAllowedUsers,
    });
    this.router.setRoute({
      method: 'POST',
      middlewares: [schemaValidation(gallerySchema), galleryLimiter],
      handler: this.create,
    });
    this.router.setRoute({
      method: 'PUT',
      suffix: '/:galleryId',
      middlewares: [schemaValidation(gallerySchema)],
      handler: this.update,
    });
    this.router.setRoute({
      method: 'DELETE',
      suffix: '/:galleryId',
      middlewares: [storageLimiter],
      handler: this.delete,
    });
    this.router.setRoute({
      method: 'PUT',
      middlewares: [
        schemaValidation(deleteManyGalleriesSchema),
        storageLimiter,
      ],
      handler: this.deleteMany,
    });
  }

  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;

    try {
      const mode = req.query.mode as 'minimal' | 'preview';

      let galleries: unknown;

      switch (mode) {
        case 'minimal':
          galleries = await galleryService.getAllWithOnlyIdAndName(userId);
          break;
        case 'preview':
          galleries = await galleryService.getAllWithPreviewPictures(userId);
          break;
        default:
          galleries = await galleryService.getAll(userId);
          break;
      }

      res.json(galleries);
    } catch (err) {
      next(err);
    }
  };

  private getOneWithPictures = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const { galleryId } = req.params;

    try {
      const gallery = await galleryService.getOne(galleryId);

      if (!gallery) {
        next(new GalleryNotFoundException(galleryId));
        return;
      }

      const sameUser = gallery.userId === userId;

      if (!sameUser && !gallery.public) {
        const user = await userService.getOne(userId);

        if (user) {
          const existsInAllowedUsers =
            await galleryService.existsInAllowedUsers(galleryId, user.email);

          if (!existsInAllowedUsers) {
            next(new NotAuthorizedException());
            return;
          }
        } else {
          next(new NotAuthorizedException());
          return;
        }
      }

      const pictures = await galleryService.getPicturesFromOne(galleryId);
      res.json({ gallery, pictures });
    } catch (err) {
      next(err);
    }
  };

  private getAllowedUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const { galleryId } = req.params;

    try {
      const galleryExistsInUser = await galleryService.existsInUser(
        userId,
        galleryId
      );

      if (galleryExistsInUser) {
        const allowedUsers = await galleryService.getAllowedUsersFromOne(
          galleryId
        );
        res.json(allowedUsers.map((allowedUser) => allowedUser.email));
      } else {
        next(new GalleryNotFoundException(galleryId));
      }
    } catch (err) {
      next(err);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const data = req.body as GalleryDto;

    try {
      const email = await userService.getEmailFromOne(userId);

      const emailAlreadyExists = email
        ? data.allowedUsers.includes(email)
        : false;

      if (!emailAlreadyExists) {
        const newGallery = await galleryService.create(userId, data);
        res.status(201).json(newGallery);
      } else {
        next(new BadRequestException());
      }
    } catch (err) {
      next(err);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const { galleryId } = req.params;
    const data = req.body as GalleryDto;

    try {
      const galleryExistsInUser = await galleryService.existsInUser(
        userId,
        galleryId
      );

      if (galleryExistsInUser) {
        const email = await userService.getEmailFromOne(userId);

        const emailAlreadyExists = email
          ? data.allowedUsers.includes(email)
          : false;

        if (!emailAlreadyExists) {
          const updatedGallery = await galleryService.update(galleryId, data);
          res.json(updatedGallery);
        } else {
          next(new BadRequestException());
        }
      } else {
        next(new GalleryNotFoundException(galleryId));
      }
    } catch (err) {
      next(err);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const { galleryId } = req.params;

    try {
      const galleryExistsInUser = await galleryService.existsInUser(
        userId,
        galleryId
      );

      if (galleryExistsInUser) {
        const gallery = await galleryService.getPicturesKeysFromOne(galleryId);

        if (gallery?.pictures && gallery.pictures.length > 0) {
          gallery.pictures.forEach(async (picture) => {
            if (picture.key) {
              await pictureStorageService.delete(picture.key);
            }
          });
        }

        const deletedGallery = await galleryService.delete(galleryId);
        res.json(deletedGallery);
      } else {
        next(new GalleryNotFoundException(galleryId));
      }
    } catch (err) {
      next(err);
    }
  };

  private deleteMany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const { galleryIds } = req.body as DeleteManyGalleriesDto;

    try {
      if (allValuesInArrayAreUnique(galleryIds)) {
        const galleries = await galleryService.getPicturesKeysFromMany(
          userId,
          galleryIds
        );

        if (galleries.length > 0) {
          galleries.forEach((gallery) => {
            if (gallery.pictures.length > 0) {
              gallery.pictures.forEach(async (picture) => {
                if (picture.key) {
                  await pictureStorageService.delete(picture.key);
                }
              });
            }
          });
        }

        const deletedGalleriesCount = await galleryService.deleteMany(
          userId,
          galleryIds
        );

        res.json(deletedGalleriesCount);
      } else {
        next(new BadRequestException());
      }
    } catch (err) {
      next(err);
    }
  };
}
