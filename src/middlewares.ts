import express from "express";

const useMiddlewares = (app) => {
  app.use(express.json());
};

export default useMiddlewares;
