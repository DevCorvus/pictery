import { HttpException } from './HttpException';

export class UserNotFoundException extends HttpException {
  constructor(userId: string) {
    super(404, `User with id ${userId} not found`);
  }
}
