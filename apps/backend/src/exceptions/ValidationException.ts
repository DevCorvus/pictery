import { ValidationError } from '@interfaces/validationError';

import { HttpException } from './HttpException';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(400, JSON.stringify(errors));
  }
}
