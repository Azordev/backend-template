import { Router } from "express";
import User from "../../models/User";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
