import express from "express";
import consign from "consign";

const app = express();

consign()
  .then("config/global.js")
  .then("config/middlewares/Authenticate.js")
  .then("config/boot.js")
  .then("config/DataBase/MongoManager.js")
  .then("src/routes")
  .then("src/controllers")
  .into(app);
