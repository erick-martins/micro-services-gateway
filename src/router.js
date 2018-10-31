const createUser = require("../src/use-cases/user");

module.exports = app => {
  app.post("/user", (req, res) => {
    createUser(req, res);
  });
};
