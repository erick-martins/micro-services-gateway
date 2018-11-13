const apiResponses = require("../../../../apiResponses");

module.exports = createUser => (req, res) => {
  const responseOk = apiResponses.ok(res);
  const responseBadRequest = apiResponses.badRequest(res);

  createUser(req.body)
    .on("create-user.Success", responseOk)
    .on("create-user.ValidationError", responseBadRequest);
};
