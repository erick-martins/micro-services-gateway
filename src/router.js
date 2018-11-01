const createUser = require("../src/use-cases/user");
const { Router } = require("express");

const router = Router();
router.post("/user", createUser);

module.exports = router;
