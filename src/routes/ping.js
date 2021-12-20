const { Router } = require("express");

const router = Router();

// A ping route to test if the server is up
router.get("/", (req, res) => {
  res.json({
    message: "pong",
  });
});

module.exports = router;
