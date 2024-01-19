import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { HttpCode } from '../../utils/AppError';

function localAuthentication(req: Request, res: Response, next: NextFunction) {
  // Note that if a callback is supplied, it becomes the application's responsibility to log-in the user, establish a session, and otherwise perform the desired operations.
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
