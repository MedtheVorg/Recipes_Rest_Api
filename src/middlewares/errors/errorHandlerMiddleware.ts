import { NextFunction, Request, Response } from 'express';
import { AppError, HttpCode } from '../../utils/AppError';
import multer from 'multer';

// custom errorHandler
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errMessage = err.message || 'Something went wrong.';
  let errStatusCode = err.httpCode || 500;
  // custom multer error handling
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_COUNT':
        errMessage = 'Only 1 image file can be uploaded';
        errStatusCode = HttpCode.BAD_REQUEST;
      //todo: handle all use cases
      //  "LIMIT_PART_COUNT" | "LIMIT_FILE_SIZE" | "LIMIT_FILE_COUNT" | "LIMIT_FIELD_KEY" | "LIMIT_FIELD_VALUE" | "LIMIT_FIELD_COUNT" | "LIMIT_UNEXPECTED_FILE"
    }
  }

  res.status(errStatusCode).json({
    success: false,
    status: errStatusCode,
    message: errMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
}
