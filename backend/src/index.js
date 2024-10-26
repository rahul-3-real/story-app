import "dotenv/config";

import connectServer from "./configs/server.config.js";
import connectDB from "./configs/database.config.js";

// Initialize App
const initializeApp = async () => {
  try {
    await connectDB();
    connectServer();
  } catch (error) {
    console.error(`🟥 Error initializing app :: ${error.message}`);
  }
};

// Initialize the application
initializeApp();
