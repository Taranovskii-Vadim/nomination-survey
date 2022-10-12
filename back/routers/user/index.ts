import jwt from "jsonwebtoken";
import { Response, Router } from "express";

import { Request, User } from "../../types";
import FileModel from "../../models/FileModel";

const router = Router();

router.get(
  "/:login",
  async ({ params }: Request<{ login: string }>, res: Response) => {
    try {
      const { login } = params;

      const users = await FileModel.getData<User[]>("users");
      const result = users.find((item) => item.login === login);

      if (!result) {
        return res.status(401).send({ message: "User not found" });
      }

      const token = jwt.sign(result, process.env.JWT_KEY);

      res.json({ ...result, token });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

export default router;
