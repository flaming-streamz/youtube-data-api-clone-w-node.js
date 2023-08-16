import logger from "@/utils/logger";
import mongoose from "mongoose";

const DATABASE_CONNECTION_URI = process.env.DATABASE_CONNECTION_URI || "mongodb://127.0.0.1:27017/youtubeapiclone";

export async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(DATABASE_CONNECTION_URI);
    logger.info(`Connected to Database ~ ${connection.connection.db.databaseName}`);
  } catch (error) {
    logger.error(error);
    process.exit(1); // Forceful exit due to failure to database connection
  }
}

export async function disconnectFromDatabase() {
  try {
    if (mongoose.connection.id) await mongoose.connection.close();
    return;
  } catch (error) {
    logger.error(error, "Error disconnecting database");
  }
}
