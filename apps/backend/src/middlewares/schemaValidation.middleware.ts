import { unlink as removeFile } from 'fs';

import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

import { ValidationException } from '@exceptions/ValidationException';
import { ValidationError } from '@interfaces/validationError';
import { logger } from '@utils/logger';

export function schemaValidation(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body);
    if (validation.success) {
      next();
    } else {
      const errors: ValidationError[] = validation.error.issues.map((issue) => {
        return {
          field: String(issue.path[0]),
          error: issue.message,
        };
      });

      if (req.file) {
        removeFile(req.file.path, (err) => {
          if (err) {
            logger.log('warn', err.message, { service: 'schema-validation' });
          }
        });
      }

      next(new ValidationException(errors));
    }
  };
}
