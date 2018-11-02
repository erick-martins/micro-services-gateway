const createUser = require("./create-user");
const { Router } = require("express");

const router = Router();

router.post("/user", createUser);

module.exports = router;
