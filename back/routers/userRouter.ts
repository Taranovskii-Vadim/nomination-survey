import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/:login", ({ params }: Request, res: Response) => {
  try {
    const { login } = params;
    // "admin" | "ordinaryUser" | "generalUser"
    const id = "qwerty";

    if (!login) {
      throw new Error("User login required");
    }

    const token = jwt.sign({ id, login }, process.env.JWT_KEY);

    res.json({ id, role: "admin", token });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
