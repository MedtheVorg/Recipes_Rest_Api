import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { HttpCode } from '../../utils/AppError';

function jwtAuthentication(req: Request, res: Response, next: NextFunction) {
  // this function will fetch the jwt token from the Authentication header
  // in the form of Bearer <token> and will pass it to the jwt strategy verify function
  // to validate
  passport.authenticate(
    'jwt',
    { session: false },
    function (
      err: any,
      user: any | false | null,
      info: { name: string; message: string },
      status: number | Array<number | undefined>
    ) {
      if (!user) {
        res
          .status(HttpCode.UNAUTHORIZED)
          .json({ msg: 'authorization failed', info: info.message });
      } else {
        next();
      }
    }
  )(req, res, next);
}

export default jwtAuthentication;
