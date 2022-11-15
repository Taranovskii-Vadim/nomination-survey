import { config } from 'dotenv';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';

import { routers } from './routers';
import { authMiddleWare } from './middlewares';

config();

const PORT = process.env.PORT || 3001;

export const server = express();

server.use(json());
server.use(cookieParser());

// TODO add readmi for project how to test and how to work

routers.forEach(({ prefix, router, isAuth = true }) => {
  const completedPrefix = `/api/${prefix}`;

  if (isAuth) {
    server.use(completedPrefix, authMiddleWare, router);
  } else {
    server.use(completedPrefix, router);
  }
});

// TODO i have used mongoDB, change to PostgreSQL in future

export const connection = server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
