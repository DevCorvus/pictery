import { unlink as removeFile } from 'fs';

import { NextFunction, Request, Response } from 'express';

import { userIsAuthenticated } from '@auth/middlewares/userIsAuthenticated.middleware';
import { Router } from '@core/router';
import { BadRequestException } from '@exceptions/BadRequestException';
import { PictureNotFoundException } from '@exceptions/PictureNotFoundException';
import { Controller } from '@interfaces/controller';
import { schemaValidation } from '@middlewares/schemaValidation.middleware';
import { storageLimiter } from '@middlewares/storageLimiter.middleware';
import { allValuesInArrayAreUnique } from '@utils/array';

import {
  DeleteManyPicturesDto,
  MoveManyPicturesDto,
  PictureDto,
} from './picture.dto';
import {
  deleteManyPicturesSchema,
  moveManyPicturesSchema,
  pictureSchema,
} from './picture.schema';
import { pictureService } from './picture.service';
import { pictureStorageService } from './picture.storage.service';
import { pictureLimiter } from './pictureLimiter.middleware';
import { singlePictureUpload } from './singlePictureUpload.middleware';

export class PictureController implements Controller {
  public router = new Router('/pictures');

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.setMiddlewares(userIsAuthenticated);

    // this.router.setRoute({
    // 	method: 'GET',
    // 	handler: this.getAll,
    // });
    // this.router.setRoute({
    // 	method: 'GET',
    // 	suffix: '/:pictureId',
    // 	handler: this.getOne,
    // });
    this.router.setRoute({
      method: 'POST',
      middlewares: [
        singlePictureUpload,
        schemaValidation(pictureSchema),
        pictureLimiter,
        storageLimiter,
      ],
      handler: this.create,
    });
    this.router.setRoute({
      method: 'PUT',
      suffix: '/move',
      middlewares: [schemaValidation(moveManyPicturesSchema)],
      handler: this.moveMany,
    });
    this.router.setRoute({
      method: 'PUT',
      suffix: '/delete',
      middlewares: [schemaValidation(deleteManyPicturesSchema), storageLimiter],
      handler: this.deleteMany,
    });
    this.router.setRoute({
      method: 'PUT',
      suffix: '/:pictureId',
      middlewares: [schemaValidation(pictureSchema)],
      handler: this.update,
    });
    this.router.setRoute({
      method: 'DELETE',
      suffix: '/:pictureId',
      middlewares: [storageLimiter],
      handler: this.delete,
    });
  }

  // private getAll = async (req: Request, res: Response, next: NextFunction) => {
  // 	const userId = req.user?.id!;

  // 	try {
  // 		const pictures = await pictureService.getAll(userId);
  // 		res.json(pictures);
  // 	} catch (err) {
  // 		next(err);
  // 	}
  // };

  // private getOne = async (req: Request, res: Response, next: NextFunction) => {
  // 	const userId = req.user!.id;
  // 	const pictureId = req.params.pictureId;

  // 	try {
  // 		const picture = await pictureService.getOneByUser(userId, pictureId);

  // 		if (picture) {
  // 			res.json(picture);
  // 		} else {
  // 			next(new PictureNotFoundException(pictureId));
  // 		}
  // 	} catch (err) {
  // 		next(err);
  // 	}
  // };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const data = req.body as PictureDto;

    const { file } = req;

    if (file) {
      try {
        const uploadMetadata = await pictureStorageService.upload(file.path);

        const newPicture = await pictureService.create(userId, {
          ...data,
          ...uploadMetadata,
        });

        res.status(201).json(newPicture);
      } catch (err) {
        next(err);
      } finally {
        removeFile(file.path, (err) => {
          if (err) {
            next(err);
          }
        });
      }
    } else {
      next(new BadRequestException());
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const { pictureId } = req.params;
    const data = req.body as PictureDto;

    try {
      const pictureExistsInUser = await pictureService.existsInUser(
        userId,
        pictureId
      );

      if (pictureExistsInUser) {
        const updatedPicture = await pictureService.update(pictureId, data);
        res.json(updatedPicture);
      } else {
        next(new PictureNotFoundException(pictureId));
      }
    } catch (err) {
      next(err);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const { pictureId } = req.params;

    try {
      const pictureExistsInUser = await pictureService.existsInUser(
        userId,
        pictureId
      );

      if (pictureExistsInUser) {
        const deletedPicture = await pictureService.delete(pictureId);

        if (deletedPicture.key) {
          await pictureStorageService.delete(deletedPicture.key);
        }

        res.json(deletedPicture);
      } else {
        next(new PictureNotFoundException(pictureId));
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
    const { pictureIds } = req.body as DeleteManyPicturesDto;

    try {
      const pictures = await pictureService.getKeysFromMany(userId, pictureIds);

      if (pictures.length > 0) {
        pictures.forEach(async (picture) => {
          if (picture.key) {
            await pictureStorageService.delete(picture.key);
          }
        });
      }

      const deletedPicturesCount = await pictureService.deleteMany(
        userId,
        pictureIds
      );
      res.json(deletedPicturesCount);
    } catch (err) {
      next(err);
    }
  };

  private moveMany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    const { galleryId, pictureIds } = req.body as MoveManyPicturesDto;

    try {
      if (allValuesInArrayAreUnique(pictureIds)) {
        const movedPicturesCount = await pictureService.moveMany(
          userId,
          pictureIds,
          galleryId
        );
        res.json(movedPicturesCount);
      } else {
        next(new BadRequestException());
      }
    } catch (err) {
      next(err);
    }
  };
}
