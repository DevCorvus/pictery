import { User } from '@common/interfaces';
import { instanceToPlain, plainToInstance } from 'class-transformer';


import { UserDto } from './user.dto';

export function parseUser(user: User) {
  return instanceToPlain(plainToInstance(UserDto, user));
}
