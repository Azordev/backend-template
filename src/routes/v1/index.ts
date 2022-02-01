import { Router } from "express";
import { pool } from "../../config/database";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

export default router;
