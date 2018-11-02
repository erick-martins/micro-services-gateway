const createUser = require("./useCase");
const requestHandler = require("./requestHandler");

module.exports = requestHandler(createUser);
