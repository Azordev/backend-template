import express from "express";
import routes from "./routes";
import useMiddlewares from "./middlewares";
import logger from "./utils/logger";

// App
const app = express();

// Middlewares
useMiddlewares(app);

// Routes
app.use("/", routes);

// Port
const port = process.env.PORT || 3000;

// Server
app.listen(port, () => {
  logger.info("Server is running on port %d", port);
});
