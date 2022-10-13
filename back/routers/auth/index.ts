import jwt from "jsonwebtoken";
import { Response, Router } from "express";

import { Request, User } from "../../types";
import FileModel from "../../models/FileModel";

const router = Router();

router.post(
  "/:login",
  async ({ params }: Request<{ login: string }>, res: Response) => {
    try {
      const { login } = params;

      const users = await FileModel.getData<User[]>("users");
      const result = users.find((item) => item.login === login);

      if (!result) {
        return res.status(401).json({ message: "User not found" });
      }

      const token = jwt.sign(result, process.env.JWT_KEY);

      res.cookie("token", token).json();
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
);

export default router;