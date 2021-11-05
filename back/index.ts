import express, { json } from "express";
import { config } from "dotenv";

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

// TODO also got no idea how to build server

const startApplication = (): void => {
  try {
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (e) {
    console.error("error");
  }
};

startApplication();
