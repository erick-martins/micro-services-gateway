const mongoose = require("mongoose");
const config = require("../config");

mongoose.Promise = require("bluebird");

module.exports = () => {
  mongoose.connect(config.database).then(() => {
    console.log("Mongo connectado!");
  });
};
