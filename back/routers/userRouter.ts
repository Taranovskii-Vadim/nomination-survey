import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

import { USERS } from "../models/User/constants";
import { User } from "../models/User/types";

const router = Router();

router.get("/:login", async ({ params }: Request, res: Response) => {
  try {
    const { login } = params;

    const result: User = USERS.find((item) => item.login === login);

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
