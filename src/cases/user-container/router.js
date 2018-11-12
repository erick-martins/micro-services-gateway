const createUser = require("./create-user");
const { Router } = require("express");

const router = Router();

router.get("/teste", (req, res) => {
  res.json({ message: "esta funcionando a api" });
});

module.exports = router;
