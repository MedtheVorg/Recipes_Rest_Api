import { config as loadLocalVariables } from 'dotenv';
//load local variables from .env file
loadLocalVariables();
//------------------------------

const PORT = process.env.PORT ? Number(process.env.PORT) : 4500;

//remote database variables
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const REMOTE_DB_CONNECTION_STRING = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@recipeapicluster.dw9gqsi.mongodb.net`;

// local database variables
const DB_NAME = 'RecipeApp';
const LOCAL_DB_CONNECTION_STRING = `mongodb://127.0.0.1:27017/${DB_NAME}`;

export const dbConfig = {
  server: {
    port: PORT,
  },
  mongoDB: {
    remoteUrl: REMOTE_DB_CONNECTION_STRING,
    localUrl: LOCAL_DB_CONNECTION_STRING,
  },
};
