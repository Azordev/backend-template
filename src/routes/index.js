const { Router } = require("express");
const pingRoute = require("./ping");
const v1Route = require("./v1");

const router = Router();

router.use("/ping", pingRoute);
router.use("/api/v1", v1Route);

module.exports = router;