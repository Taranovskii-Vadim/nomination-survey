import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

import FileModel from "../models/FileModel";

import { User } from "../types";

const router = Router();

router.get("/:login", async ({ params }: Request, res: Response) => {
  try {
    const { login } = params;

    const users = await FileModel.getData<User[]>("database", "users.json");

    const result = users.find((item) => item.login === login);

    if (!login || !result) {
      return res.status(404).send("User not found");
    }

    const { id, role } = result;

    const token = jwt.sign({ id, login, role }, process.env.JWT_KEY);

    res.json({ id, role, token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
