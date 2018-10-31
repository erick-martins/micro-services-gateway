const createUser = require("./createUser");
const requestHandler = require("./requestHandler");

module.exports = (req, res) =>
  requestHandler({
    createUser: createUser(req.body, res)
  });
