import jwt from "jsonwebtoken";
import { Response, Request, Router } from "express";

import { User } from "../../types";
import FileModel from "../../models/FileModel";

import { formatData, formatError } from "../helpers";

const router = Router();

// 5 min
const maxAge = 300000;
// 1 min
// const maxAge = 60000;

router.post(
  "/:login",
  async ({ params }: Request<{ login: string }>, res: Response) => {
    try {
      const { login } = params;

      const users = await FileModel.getData<User[]>("users");
      const result = users.find((item) => item.login === login);

      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }

      const token = jwt.sign(result, process.env.JWT_KEY);

      res.cookie("token", token, { maxAge }).json(formatData());
    } catch (e) {
      res.status(500).json(formatError(e.message));
    }
  }
);

export default router;
