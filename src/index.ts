// this package will catch errors that occur inside async code or any Custom thrown  Errors
// and pass them to express error handler middleware as express v4 can't do this by default
// so we don't need to use the try catch syntax
import 'express-async-errors';
//-------------------------------------------------------------------------------------------
import express, { Express } from 'express';
import compression from 'compression';
import { connectToMongoDB } from './mongo';
import Logger from './utils/logger';
import { dbConfig } from './config/mongoDBConfig';
import cors from 'cors';
import healthCheck from './controllers/healthCheck';
import requestLogger from './middlewares/log/requestLogger';
import { errorHandler } from './middlewares/errors/errorHandlerMiddleware';
import notFound from './middlewares/notFound';
import swaggerUI from 'swagger-ui-express';
import { swaggerUiSpecs } from './documentation/swagger';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import { GlobalRouter } from './routes';

// we need to import the entire module so index.ts knows about it
// especially the passport.use(strategy) line
import './middlewares/authentication/passportJs';
import passport from 'passport';

// Main APP (Router)
const app: Express = express();

// server entry point
initializeApp();

async function initializeApp() {
  const { isConnected, dataBaseName, errorMessage, mongoDBClient } =
    await connectToMongoDB(dbConfig.mongoDB.localUrl, 'local');
  if (isConnected) {
    Logger.success(`Connected successfully to ${dataBaseName} database.`);
    startServer(mongoDBClient!);
  } else {
    Logger.error(`Connection to database failed.`);
    Logger.error(`Reason  : ${errorMessage}`);
    // kill the current process and exit the application
    process.exit();
  }
}
function startServer(mongoDBClient: mongoose.mongo.MongoClient) {
  //#region -----------------Middlewares-------------------
  // we parse the url query params using the URLSearchParams class
  app.set(
    'query parser',
    (queryString: string) => new URLSearchParams(queryString)
  );

  // cors configuration
  app.use(
    cors({
      origin: '*',
      methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    })
  );
  app.use(requestLogger); // custom middleware to log request and response
  app.use(compression()); //This middleware will attempt to compress response bodies
  app.use(express.json()); // parses incoming request with json payload
  app.use(express.urlencoded({ extended: true })); // parses incoming request with form data payload
  app.use(express.static('./uploads')); //enable the server to serve static resources from the uploads folder

  //session based cookies which are stored in a mongoDB store
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        client: mongoDBClient,
        collectionName: 'userSessions',
      }),
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
      },
    })
  );

  //passport stuff (will refactor this comment later  once I understand exactly what it does)
  // used to initialize passport and allow defined strategies to be used on incoming requests
  app.use(passport.initialize());

  //IGNORE:------------
  // used to populate req.user with data from the current session
  // after a successful login action
  app.use(passport.session());
  //IGNORE:------------

  //swaggerUI docs Interface
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerUiSpecs));
  //#endregion

  //#region -----------------Routes-------------------
  app.get('/', healthCheck); //Health check
  app.use('/api/v1', GlobalRouter);
  //#endregion

  //unhandled Route
  app.use(notFound);

  // Error Handler
  app.use(errorHandler);

  // Listen for connections.
  app.listen(dbConfig.server.port, () => {
    Logger.info(`Server running on  http://localhost:${dbConfig.server.port}`);
  });
}
