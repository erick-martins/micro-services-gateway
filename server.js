import express from "express";
import consign from "consign";

const app = express();

consign()
  .then("config")
  .then("src/middlewares/authenticate.js")
  .then("src/usercases")
  .then("src/services")
  .into(app);
