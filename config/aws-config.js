const CognitoExpress = require("cognito-express");

const cognito = new CognitoExpress({
  region: "us-east-1",
  cognitoUserPoolId: "us-east-1_8sanbRmti",
  tokenUse: "access",
  tokenExpiration: 3600000
});

module.exports = cognito;
