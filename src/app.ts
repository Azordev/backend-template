import express from "express";
import routes from "./routes";
import useMiddlewares from "./middlewares";

// App
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
useMiddlewares(app);

// Routes
app.use("/", routes);

export default app;
