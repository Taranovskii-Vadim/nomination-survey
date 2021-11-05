import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", ({ body }: Request, res: Response) => {
  try {
    const { login } = body;

    if (!login) {
      throw new Error("User login required");
    }

    const token = jwt.sign({ id: "qwerty", login }, process.env.JWT_KEY);

    res.json({ token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
