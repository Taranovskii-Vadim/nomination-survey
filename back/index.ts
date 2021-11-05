import express, { json } from "express";
import { config } from "dotenv";

import { routers } from "./routers";

config();

const PORT = process.env.PORT || 3001;

const server = express();

server.use(json());

routers.forEach(({ prefix, router }) => {
  server.use(`/api${prefix}`, router);
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
