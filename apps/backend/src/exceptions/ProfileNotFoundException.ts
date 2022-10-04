import { HttpException } from './HttpException';

export class ProfileNotFoundException extends HttpException {
  constructor(userId: string) {
    super(404, `Profile with user id ${userId} not found`);
  }
}
