const createUser = require("./create-user");
const { Router } = require("express");

const router = Router();

router.get("/teste", function(req, res) {
  res.json({ message: "api funcionando" });
});

module.exports = router;
