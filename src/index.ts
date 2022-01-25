import express from "express";
import { config as dotenvConfig } from "dotenv";

import routes from "./routes";
import useMiddlewares from "./middlewares";

// App
const app = express();

// Settings
dotenvConfig();

// Middlewares
useMiddlewares(app);

// Routes
app.use("/", routes);

// Port
const port = process.env.PORT || 3000;

// Server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
