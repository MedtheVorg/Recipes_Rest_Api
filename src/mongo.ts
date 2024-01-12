import mongoose from 'mongoose';
import Logger from './utils/logger';

type ConnectionResponseType = {
  isConnected: boolean;
  dataBaseName?: string;
  errorMessage?: string;
};
async function connectToMongoDB(
  mongoURL: string,
  mode: 'local' | 'remote'
): Promise<ConnectionResponseType> {
  try {
    Logger.info(`Connecting to MongoDB Database... |  Mode : ${mode}`);
    const { connection } = await mongoose.connect(mongoURL);

    if (connection.readyState == 1) {
      return {
        isConnected: true,
        dataBaseName: connection.name,
      };
    } else {
      return {
        isConnected: false,
      };
    }
  } catch (error: any) {
    return {
      isConnected: false,
      errorMessage: error.message,
    };
  }
}

export { connectToMongoDB };
