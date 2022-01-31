import express from "express";
import routes from "./routes";
import useMiddlewares from "./middlewares";
import { pool } from "./config/database";

// App
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
pool.connect(() => {
  console.log("Connected to the database");
});

// Middlewares
useMiddlewares(app);

// Routes
app.use("/", routes);

export default app;
