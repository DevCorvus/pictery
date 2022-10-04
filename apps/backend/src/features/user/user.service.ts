import { User } from '@common/interfaces';

import { prisma } from '@lib/prisma';
import { hashPassword } from '@utils/password';

import { CreateUserDto, CreateUserWithGoogleDto } from './user.dto';

class UserService {
  async getOne(userId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  async getOneByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async getOneByGoogleId(googleId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { googleId } });
  }

  async getEmailFromOne(userId: string): Promise<string | null> {
    const result = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
      },
    });
    return result ? result.email : null;
  }

  async create({ email, password, name }: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {
            name,
          },
        },
      },
    });
  }

  async createWithGoogleOAuth2({
    googleId,
    email,
    name,
  }: CreateUserWithGoogleDto): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        googleId,
        profile: {
          create: {
            name,
          },
        },
      },
    });
  }

  async delete(userId: string): Promise<User> {
    return prisma.user.delete({
      where: { id: userId },
    });
  }

  async existsById(userId: string) {
    const usersCount = await prisma.user.count({ where: { id: userId } });
    return usersCount > 0;
  }

  async existsByEmail(email: string) {
    const usersCount = await prisma.user.count({ where: { email } });
    return usersCount > 0;
  }
}

export const userService = new UserService();
