import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";

import cors, { handleError } from "./middlewares";
import { loginHandler, registerHandler, tokenMiddleware } from "./routes/auth";
import keywordsRouter from "./routes/keywords";
import uploadsRouter from "./routes/uploads";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors)
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    })
    .post("/login", loginHandler)
    .post("/register", registerHandler)
    .use(tokenMiddleware)
    .use("/uploads", uploadsRouter)
    .use("/keywords", keywordsRouter)
    .use(handleError);

  return app;
};
