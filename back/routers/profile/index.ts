import { Response, Router } from "express";

import { Request } from "../../types";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const { fullname, role } = req.user;

  res.json({ fullname, role });
});

export default router;
