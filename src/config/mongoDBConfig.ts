import { config as loadLocalVariables } from 'dotenv';
//load local variables from .env file
loadLocalVariables();
//------------------------------

const PORT = process.env.PORT ? Number(process.env.PORT) : 4500;

//remote database variables
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const Remote_DB_Connection_String = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@recipeapicluster.dw9gqsi.mongodb.net`;

// local database variables
const DB_NAME = 'RecipeApp';
const Local_DB_Connection_String = `mongodb://127.0.0.1:27017/${DB_NAME}`;

export const dbConfig = {
  server: {
    port: PORT,
  },
  mongoDB: {
    remoteUrl: Remote_DB_Connection_String,
    localUrl: Local_DB_Connection_String,
  },
};
