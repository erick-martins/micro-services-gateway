import express from "express";
import consign from "consign";

const app = express();

consign()
  .then("config")
  .then("src/use-cases")
  .then("src/router.js")
  .into(app);
