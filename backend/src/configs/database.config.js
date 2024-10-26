import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const databaseName = process.env.DB_NAME;

    if (!mongoUrl || !databaseName) {
      throw new Error(
        "🟥 Missing MONGO_URL or DB_NAME in environment variables."
      );
    }

    const connectionUrl = `${mongoUrl}/${databaseName}`;

    // Connect to MongoDB
    const instance = await mongoose.connect(connectionUrl);
    console.log(`🟩 Database connected on HOST :: ${instance.connection.host}`);
    return instance;
  } catch (error) {
    console.error(`🟥 Error connecting Database :: ${error}`);
  }
};

export default connectDB;
