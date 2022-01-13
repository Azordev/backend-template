import express, { Express } from "express";
import morgan from "morgan";
import logger from "./utils/logger";

const useMiddlewares = (app: Express) => {
  app.use(
    morgan("short", {
      stream: {
        write: (message) => logger.http(message),
      },
    })
  );

  app.use(express.json());
};

export default useMiddlewares;
