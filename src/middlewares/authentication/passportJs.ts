import passport from 'passport';
import {
  Strategy as LocalStrategy,
  VerifyFunction,
  VerifyFunctionWithRequest,
} from 'passport-local';
import { HydratedUserDocument, User } from '../../models/userModel';
import { verifyPassword } from '../../utils/helperFunction';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback,
  VerifiedCallback,
} from 'passport-jwt';
import { PUB_KEY } from './PEM-ENCODED-KEYS';
import { NextFunction, Request, Response } from 'express';

//#region  ---LOCAL STRATEGY----------
// A callback function to execute in order to authenticate a user (by username and password).
const localVerifyFunction: VerifyFunction = async (
  username,
  password,
  done
) => {
  try {
    const user: HydratedUserDocument | null = await User.findOne({
      username,
    }).exec();

    if (!user) {
      done(null, false, { message: ' user does not exists' });
    } else {
      const isValid = await verifyPassword(password, user.password);

      if (!isValid) {
        done(null, false, { message: 'invalid  password' });
      } else {
        done(null, user, { message: 'Authenticated Successfully' });
      }
    }
  } catch (error) {
    //Something went wrong.
    done(error);
  }
};

//  local strategy.
const localStrategy = new LocalStrategy(
  // Options
  // fields names that the verify function callback will look for in the req.body and use as arguments
  { usernameField: 'username', passwordField: 'password' },
  // Verify function
  localVerifyFunction
);
//#endregion

//#region -------JWT STRATEGY------------
const jwtVerifyFunction: VerifyCallback = async (
  payload: any,
  done: VerifiedCallback
) => {
  // implement verification logic

  //TODO: jwt seems to stay valid even though it is passed its expiration date ??
  try {
    const user = await User.findById({ _id: payload.sub });
    if (!user) {
      done(null, false, { message: 'user does not exist' });
    } else {
      done(null, user, { message: 'Authenticated Successfully' });
    }
  } catch (error) {
    done(error, false, { message: 'something went wrong while verifying jwt' });
  }
};

const jwtStrategy = new JwtStrategy(
  {
    algorithms: ['RS256'],
    //Authorization: Bearer <token>
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    ignoreExpiration: false,
  },
  jwtVerifyFunction
);

//#endregion

//Register a strategy to passport.
passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);

// this function will be called after a successful authentication action (ex: login)
// and will add user relevant data to the session cookie (user.id in our case)
passport.serializeUser(
  (
    // TODO : need to do more research on this case
    user, // I extended the Express.User interface  in order for ts to stop complaining
    done
  ) => {
    done(null, user._id);
  }
);

// this function will run on every subsequent request
// to retrieve the user from the sessionStore and add it to the req.user Object
passport.deserializeUser(async (userID, done) => {
  try {
    const user = await User.findById(userID).exec();

    if (user) {
      done(null, user);
    }
  } catch (error) {
    done(error);
  }
});

// verification functions for local strategy
export const isAuth = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  } else {
    // unauthorized
    return res
      .status(401)
      .json({ msg: 'you are not authorized to access this resource' });
  }
};
export const isAdmin = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    // forbidden
    return res
      .status(403)
      .json({ msg: 'only Admin members can access this ressource ' });
  }
};
