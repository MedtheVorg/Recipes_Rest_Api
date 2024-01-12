// this package will catch errors that occur inside async code or any Custom thrown  Errors
// and pass them to express error handler middleware as express v4 can't do this by default
// so we don't need to use the try catch syntax
import 'express-async-errors';
//-------------------------------------------------------------------------------------------
import express from 'express';
import compression from 'compression';
import { connectToMongoDB } from './mongo';
import Logger from './utils/logger';
import healthCheck from './controllers/healthCheck';
import requestLogger from './middlewares/log/requestLogger';
import { errorHandler } from './middlewares/errors/errorHandlerMiddleware';
import notFound from './middlewares/notFound';
import { RecipeRouter } from './routers/recipeRouter';
import { dbConfig } from './config/mongoDBConfig';
import cors, { CorsOptions } from 'cors';
// Main APP (Router)
const app = express();

// server entry point
initializeApp();

async function initializeApp() {
  const { isConnected, dataBaseName, errorMessage } = await connectToMongoDB(
    dbConfig.mongoDB.localUrl,
    'local'
  );
  if (isConnected) {
    Logger.success(`Connected successfully to ${dataBaseName} database.`);
    startServer();
  } else {
    Logger.error(`Connection to database failed.`);
    Logger.error(`Reason  : ${errorMessage}`);
    // kill the current process and exit the application
    process.exit();
  }
}

function startServer() {
  //-------Query parsing settings-------------------
  // we parse the url query params using the URLSearchParams class
  app.set(
    'query parser',
    (queryString: string) => new URLSearchParams(queryString)
  );
  //----------------------------------------------------
  //----CORS CONFIGURATION-----------------------------
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  };
  app.use(cors(corsOptions));
  //-----------------------------------------------

  //Middlewares
  app.use(requestLogger); // custom middleware to log request and response
  app.use(compression()); //This middleware will attempt to compress response bodies
  app.use(express.json()); // parses incoming request with json payload
  app.get('/', healthCheck); //Health check
  //Routers
  app.use('/api/v1', RecipeRouter);

  //unhandled Route
  app.use(notFound);

  // Error Handler
  app.use(errorHandler);

  // Listen for connections.
  app.listen(dbConfig.server.port, () => {
    Logger.info(`Server running on  http://localhost:${dbConfig.server.port}`);
  });
}
