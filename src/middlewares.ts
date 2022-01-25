import express, { Application } from "express";

const useMiddlewares = (app: Application) => {
  app.use(express.json());
};

export default useMiddlewares;
