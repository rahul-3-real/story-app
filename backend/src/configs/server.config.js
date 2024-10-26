import app from "./app.config.js";

const connectServer = () => {
  const PORT = process.env.PORT || 8000;
  const APP_URL = process.env.APP_URL || "http://localhost";

  try {
    const appUrl = `${APP_URL}:${PORT}`;
    const connection = app.listen(PORT, () => {
      console.log(`🟩 Server connected on :: ${appUrl}`);
    });
    return connection;
  } catch (error) {
    console.error(`🟥 Error connecting server :: ${error}`);
  }
};

export default connectServer;
