const createUser = require("./createUser");
const requestHandler = require("./requestHandler");

module.exports = requestHandler(createUser);
