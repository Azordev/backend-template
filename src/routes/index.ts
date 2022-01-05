import { Router } from "express";
import pingRoute from "./ping";
import v1Route from "./v1";

const router = Router();

router.use("/ping", pingRoute);
router.use("/api/v1", v1Route);

export default router;
