const apiResponses = require("../../../../apiResponses");

module.exports = createUser => (req, res) => {
  const responseOk = apiResponses.ok(res);
  const responseBadRequest = apiResponses.badRequest(res);
  const responseNotFound = apiResponses.notFound(res);

  createUser(req.body)
    .on("CreateUser.Success", responseOk)
    .on("ValidationError", responseBadRequest)
    .on("CreateUser.responseNotFound", responseNotFound);
};