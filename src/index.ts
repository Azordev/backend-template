import express from "express";
import { config as dotenvConfig } from "dotenv";

import routes from "./routes";
import useMiddlewares from "./middlewares";
import { pool } from "./config/database";

// App
const app = express();

// Settings
dotenvConfig();
pool.connect(() => {
  console.log("Connected to the database");
});

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
