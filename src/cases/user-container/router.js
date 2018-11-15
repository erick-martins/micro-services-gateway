const createUser = require("./create-user");
const { Router } = require("express");

const router = Router();

router.get("/public", (req, res) => {
  res.json({ message: "esta funcionando a api pra caralho!" });
});

router.get("/api/private", (req, res) => {
  res.json({ message: "Esta authenticado" });
});

module.exports = router;
