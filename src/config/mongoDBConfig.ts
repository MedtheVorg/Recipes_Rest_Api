import { config as loadLocalVariables } from 'dotenv';
//load local variables from .env file
loadLocalVariables();
//------------------------------

const PORT = process.env.PORT ? Number(process.env.PORT) : 4500;

//remote database
const REMOTE_DB_CONNECTION_STRING = process.env
  .REMOTE_DB_CONNECTION_STRING as string;

// local database
const LOCAL_DB_CONNECTION_STRING = process.env
  .LOCAL_DB_CONNECTION_STRING as string;

export const dbConfig = {
  server: {
    port: PORT,
  },
  mongoDB: {
    remoteUrl: REMOTE_DB_CONNECTION_STRING,
    localUrl: LOCAL_DB_CONNECTION_STRING,
  },
};
