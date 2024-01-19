import express, { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';
import Logger from '../utils/logger';
import jwtAuthentication from '../middlewares/authentication/jwtAuthenticate';
import localAuthentication from '../middlewares/authentication/localAuthenticate';
import { HttpCode } from '../utils/AppError';
import { issueJWT } from '../utils/helperFunction';
import { validateUserPayload_JSON } from '../middlewares/validator/validators';

const router = express.Router();

//#region ---PLAYGORUND ROUTES-----------

router.get('/protected', jwtAuthentication, (req, res, next) => {
  res.json({ msg: 'all good' });
});

// welcome page
router.get('/', (req, res, next) => {
  res.send(
    `<h1>Home</h1><p>Please <a href="/api/v1/playground/register">register</a></p><p>view count</p>`
  );
});

// the route that will apply the authentication strategy and responds back
// based on the failure or success outcome.
router.post(
  '/login',
  localAuthentication,
  (req: Request, res: Response, next: NextFunction) => {
    console.log('authenticated successfully');
    console.log('req.user :', req.user);

    //set jwt cookie
    const signedJwt = issueJWT(req.user!);
    res.cookie('jwt', signedJwt.token.split(' ')[1]);
    res.setHeader('Authorization', signedJwt.token);
    res.status(HttpCode.OK).json({ msg: 'you are logged in !' });
  }
);

// the route called by the register form to register a new user.
router.post('/register', validateUserPayload_JSON, async (req, res, next) => {
  const {
    body: { username, password },
  } = req;

  const { admin } = req.params;
  const createdUser = User.build({
    username,
    password,
    isAdmin: admin === '1' ? true : false,
  });
  await createdUser.save();
  res.status(HttpCode.CREATED).json({ user: createdUser });
});

// login page
router.get('/login', (req, res, next) => {
  const form = `<h1>Login Page</h1>
    <form method="POST" action="/api/v1/playground/login">
      Enter Username:<br>
      <input type="text" name="username">\
      <br>Enter Password:<br>
      <input type="password" name="password">\
      <br><br>
      <input type="submit" value="Submit">
    </form>`;

  res.send(form);
});

// register page.
router.get('/register', (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="/api/v1/playground/register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
  // removes user related data from the session cookie
  req.logout((err) => {
    if (err) {
      Logger.error(err);
    } else {
      Logger.warn('user logged out Successfuly');
    }
  });

  // TODO: depending on the use case we have to remove additional user data if necessary as req.logout() only removes the serialized data added by the passport.serializeUser() function

  res.redirect('/api/v1/playground/login');
});

// After providing login credentials :  successfully logged in
router.get('/login-success', (req, res, next) => {
  // in this case passportJs will call the serializeUser function to add relevant user data to the session cookie
  res.send(
    '<p>You successfully logged in. --> <a href="/api/v1/playground/protected-route">Go to protected route</a></p>'
  );
});

//After providing login credentials : failed to log in
router.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});

//#endregion

export { router as playgroundRoutes };
