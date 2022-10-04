import { Picture } from '@common/interfaces/picture.interface';

import { prisma } from '@lib/prisma';

import { PictureDto, StorePictureDto } from './picture.dto';

class PictureService {
  async getOneByUser(
    userId: string,
    pictureId: string
  ): Promise<Picture | null> {
    return prisma.picture.findFirst({
      where: {
        id: pictureId,
        userId,
      },
    });
  }

  async create(userId: string, data: StorePictureDto): Promise<Picture> {
    return prisma.picture.create({
      data: { ...data, userId },
    });
  }

  async update(pictureId: string, data: PictureDto): Promise<Picture> {
    return prisma.picture.update({
      where: {
        id: pictureId,
      },
      data,
    });
  }

  async delete(pictureId: string): Promise<Picture> {
    return prisma.picture.delete({
      where: {
        id: pictureId,
      },
    });
  }

  async deleteMany(
    userId: string,
    pictureIds: string[]
  ): Promise<{ count: number }> {
    return prisma.picture.deleteMany({
      where: {
        userId,
        AND: {
          id: {
            in: pictureIds,
          },
        },
      },
    });
  }

  async moveMany(
    userId: string,
    pictureIds: string[],
    galleryId: string
  ): Promise<{ count: number }> {
    return prisma.picture.updateMany({
      where: {
        userId,
        AND: {
          id: {
            in: pictureIds,
          },
        },
      },
      data: {
        galleryId,
      },
    });
  }

  async getCount(userId: string): Promise<number> {
    return prisma.picture.count({
      where: {
        userId,
      },
    });
  }

  async existsInUser(userId: string, pictureId: string): Promise<boolean> {
    return (
      (await prisma.picture.count({
        where: {
          userId,
          id: pictureId,
        },
      })) > 0
    );
  }

  async getKeysFromAll(userId: string): Promise<{ key: string | null }[]> {
    return prisma.picture.findMany({
      where: {
        userId,
      },
      select: {
        key: true,
      },
    });
  }

  async getKeysFromMany(
    userId: string,
    pictureIds: string[]
  ): Promise<{ key: string | null }[]> {
    return prisma.picture.findMany({
      where: {
        userId,
        AND: {
          id: {
            in: pictureIds,
          },
        },
      },
      select: {
        key: true,
      },
    });
  }
}

export const pictureService = new PictureService();
