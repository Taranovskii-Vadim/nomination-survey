import express, { json } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";

import { routers } from "./routers";
import { authMiddleWare } from "./middlewares";

config();

const PORT = process.env.PORT || 3001;

const server = express();

server.use(json());

routers.forEach(({ prefix, router, isAuth = true }) => {
  const completedPrefix = `/api${prefix}`;
  if (isAuth) {
    server.use(completedPrefix, authMiddleWare, router);
  } else {
    server.use(completedPrefix, router);
  }
});

const startApplication = (): void => {
  try {
    const password = process.env.PASSWORD;
    connect(
      `mongodb+srv://vadim:${password}@cluster0.6xvvs.mongodb.net/Surveys?retryWrites=true&w=majority`
    );
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.error("error");
  }
};

startApplication();
