import { Gallery, GalleryAllowedUser } from '@common/interfaces';
import { Picture } from '@common/interfaces/picture.interface';

import { prisma } from '@lib/prisma';

import { GalleryDto } from './gallery.dto';

class GalleryService {
  async getAll(userId: string): Promise<Gallery[]> {
    return prisma.gallery.findMany({
      where: {
        userId,
      },
    });
  }

  async getAllWithPreviewPictures(userId: string): Promise<Gallery[]> {
    return prisma.gallery.findMany({
      where: {
        userId,
      },
      include: {
        pictures: {
          take: 3,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            url: true,
          },
        },
      },
    });
  }

  async getAllWithOnlyIdAndName(
    userId: string
  ): Promise<{ id: string; name: string }[]> {
    return prisma.gallery.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getOne(galleryId: string): Promise<Gallery | null> {
    return prisma.gallery.findUnique({
      where: {
        id: galleryId,
      },
    });
  }

  async getPicturesFromOne(galleryId: string): Promise<Picture[] | null> {
    return prisma.gallery
      .findUnique({
        where: {
          id: galleryId,
        },
      })
      .pictures();
  }

  async create(
    userId: string,
    { name, description, public: isPublic, allowedUsers }: GalleryDto
  ): Promise<Gallery> {
    const allowedUsersFormatted = allowedUsers.map((allowedUser) => {
      return {
        email: allowedUser,
      };
    });

    return prisma.gallery.create({
      data: {
        userId,
        name,
        description,
        public: isPublic,
        allowedUsers: {
          create: allowedUsersFormatted,
        },
      },
    });
  }

  async update(
    galleryId: string,
    { name, description, public: isPublic, allowedUsers }: GalleryDto
  ): Promise<Gallery> {
    await prisma.galleryAllowedUser.deleteMany({
      where: {
        galleryId,
      },
    });

    const allowedUsersFormatted = allowedUsers.map((allowedUser) => {
      return {
        email: allowedUser,
      };
    });

    return prisma.gallery.update({
      where: {
        id: galleryId,
      },
      data: {
        name,
        description,
        public: isPublic,
        allowedUsers: {
          create: allowedUsersFormatted,
        },
      },
    });
  }

  async delete(galleryId: string): Promise<Gallery> {
    return prisma.gallery.delete({
      where: {
        id: galleryId,
      },
    });
  }

  async deleteMany(
    userId: string,
    galleryIds: string[]
  ): Promise<{ count: number }> {
    return prisma.gallery.deleteMany({
      where: {
        userId,
        AND: {
          id: {
            in: galleryIds,
          },
        },
      },
    });
  }

  async getCount(userId: string): Promise<number> {
    return prisma.gallery.count({
      where: {
        userId,
      },
    });
  }

  async existsInUser(userId: string, galleryId: string): Promise<boolean> {
    return (
      (await prisma.gallery.count({
        where: {
          userId,
          id: galleryId,
        },
      })) > 0
    );
  }

  async getPicturesKeysFromOne(
    galleryId: string
  ): Promise<{ pictures: { key: string | null }[] } | null> {
    return prisma.gallery.findFirst({
      where: {
        id: galleryId,
      },
      select: {
        pictures: {
          select: {
            key: true,
          },
        },
      },
    });
  }

  async getPicturesKeysFromMany(
    userId: string,
    galleriesIds: string[]
  ): Promise<{ pictures: { key: string | null }[] }[]> {
    return prisma.gallery.findMany({
      where: {
        userId,
        AND: {
          id: {
            in: galleriesIds,
          },
        },
      },
      select: {
        pictures: {
          select: {
            key: true,
          },
        },
      },
    });
  }

  async getAllowedUsersFromOne(
    galleryId: string
  ): Promise<GalleryAllowedUser[]> {
    return prisma.gallery
      .findUnique({ where: { id: galleryId } })
      .allowedUsers();
  }

  async existsInAllowedUsers(
    galleryId: string,
    email: string
  ): Promise<boolean> {
    return (
      (await prisma.galleryAllowedUser.count({
        where: {
          email,
          galleryId,
        },
      })) > 0
    );
  }
}

export const galleryService = new GalleryService();
