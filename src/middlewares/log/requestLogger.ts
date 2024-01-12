import { NextFunction, Request, Response } from 'express';
import Logger from '../../utils/logger';

export default function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { method, url, ip } = req;
  const { statusCode } = res;

  Logger.info(
    `Request ==> METHOD : [${method}] - URL : [${url}] - IP : [${ip}]`
  );

  res.on('finish', function logResponseDetails() {
    Logger.info(
      `Response ==> METHOD : [${req.method}] - URL : [${req.url}] - IP : [${req.ip}] - STATUS : [${statusCode}]\n`
    );
  });

  next();
}
