const apiResponses = require("../../../apiResponses");
const createUser = require("../user");

module.exports = () => (req, res) => {
  console.log("eu to no resquestHandler");

  const responseOk = apiResponses.ok(res);
  const responseBadRequest = apiResponses.badRequest(res);
  const responseNotFound = apiResponses.notFound(res);

  createUser(req.body, res)
    .on("CreateUser.Success", responseOk)
    .on("CreateUser.BodyNotValid", responseBadRequest)
    .on("CreateUser.responseNotFound", responseNotFound);
};
