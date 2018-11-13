const { Router } = require("express");
const cognito = require("../../config/aws-config");
const AuthenticationRouter = Router();

AuthenticationRouter.use(function(req, res, next) {
  let Authorization = req.headers.authorization;

  if (!Authorization)
    return res.status(401).send({
      name: "TokenNotFound",
      message: "access token not found"
    });

  cognito.validate(Authorization, function(err, response) {
    if (err) {
      return res.status(401).send(err);
    } else {
      res.locals.user = response;
      next();
    }
  });
});

module.exports = AuthenticationRouter;
