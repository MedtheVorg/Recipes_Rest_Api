import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { HttpCode } from '../../utils/AppError';

function localAuthentication(req: Request, res: Response, next: NextFunction) {
  // this function will validate user data (username and password) in the form of json or form-urlencoded
  // and pass it to the local strategy verify function to authenticate a user
  passport.authenticate(
    'local',
    function (
      err: any,
      user: any | false | null,
      info: { name: string; message: string },
      status: number | Array<number | undefined>
    ) {
      if (!user) {
        res
          .status(HttpCode.UNAUTHORIZED)
          .json({ msg: 'authentication failed', info: info.message });
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
}

export default localAuthentication;
