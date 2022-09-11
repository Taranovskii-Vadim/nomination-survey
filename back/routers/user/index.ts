import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

import FileModel from "../../models/FileModel";

import { User } from "../../types";

const router = Router();

router.get("/:login", async ({ params }: Request, res: Response) => {
  try {
    const { login } = params;

    const users = await FileModel.getData<User[]>("database", "users.json");

    const result = users.find((item) => item.login === login);

    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }

    const token = jwt.sign(result, process.env.JWT_KEY);

    res.json({ ...result, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
