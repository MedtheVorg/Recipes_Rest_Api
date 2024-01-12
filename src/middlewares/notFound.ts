import { Request, Response } from 'express';
import { AppError, HttpCode } from '../utils/AppError';

function notFound(req: Request, res: Response) {
  throw new AppError({
    httpCode: HttpCode.NOT_FOUND,
    description: 'You are trying to access an endpoint that does not exist.',
  });
}

export default notFound;
