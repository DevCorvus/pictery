import { Profile } from '@common/interfaces';
import { Profile as PrismaProfile } from '@prisma/client';

import { prisma } from '@lib/prisma';

class ProfileService {
  async getOne(userId: string): Promise<Profile | null> {
    const profile = (await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            _count: {
              select: {
                galleries: true,
                pictures: true,
              },
            },
          },
        },
      },
    })) as PrismaProfile & {
      user: {
        _count: {
          galleries: number;
          pictures: number;
        };
      };
    };

    if (profile) {
      return {
        id: profile.id,
        name: profile.name,
        galleries: profile.user._count.galleries,
        pictures: profile.user._count.pictures,
        createdAt: profile.createdAt,
        userId: profile.userId,
      };
    } else {
      return null;
    }
  }
}

export const profileService = new ProfileService();
