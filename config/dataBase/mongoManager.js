import mongoose from "mongoose";
import config from "../config";

mongoose.Promise = require("bluebird");

module.exports = () => {
  mongoose.connect(config.database).then(() => {
    console.log("Mongo connectado!");
  });
};
