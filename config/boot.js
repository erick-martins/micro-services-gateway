const config = require("./config");
const mongoManager = require("./dataBase/mongoManager");
const globalConfiguration = require("./global");
const express = require("express");
const app = express();

module.exports = () => {
  // create server
  app.listen(config.port, () => {
    console.log(`Servidor executando na porta ${config.port.toString()}`);
  });

  // loading global configurations
  globalConfiguration(app);

  // conection mongo
  mongoManager();
};
