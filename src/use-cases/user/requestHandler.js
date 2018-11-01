const apiResponses = require("../../../apiResponses");

module.exports = createUser => (req, res) => {
  console.log("eu to no resquestHandler");

  const responseOk = apiResponses.ok(res);
  const responseBadRequest = apiResponses.badRequest(res);
  const responseNotFound = apiResponses.notFound(res);

  createUser(req.body)
    .on("CreateUser.Success", responseOk)
    .on("ValidationError", responseBadRequest)
    .on("CreateUser.responseNotFound", responseNotFound);
};
