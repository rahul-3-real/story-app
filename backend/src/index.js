import { app } from "./app.js";
import connectDB from "./config/database.js";

// Connecting to database and starting the server
const port = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(port);
    console.log(`SERVER RUNNING ON PORT !!! ${port}`);
  })
  .catch((error) => {
    console.log(`ERROR CONNECTING TO SERVER !!! ${error}`);
  });
