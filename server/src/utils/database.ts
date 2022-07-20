import mongoose from 'mongoose';
import logger from './logger';

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/virtual_learning";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connected with database");
  } catch (e) {
    logger.error(e, "Failed to connect to a database. Goodbye.");
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
    await mongoose.connection.close();
    logger.info("Disconnect From Database");
    return;
}
