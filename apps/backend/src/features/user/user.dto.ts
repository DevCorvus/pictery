import { Exclude } from 'class-transformer';
import { z } from 'zod';

import { createUserSchema } from './user.schema';

export type CreateUserDto = z.infer<typeof createUserSchema>;

export interface CreateUserWithGoogleDto {
  googleId: string;
  email: string;
  name: string;
  image?: string;
}

export class UserDto {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  googleId: string;

  @Exclude()
  password: string;
}
