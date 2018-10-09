import User from "../models/UserSchema";
import UserController from "../controllers/UserController";

module.exports = app => {
  app.get("/User", (req, res) => {
    UserController.findAll(res);
  });

  app.post("/user", (req, res) => {
    UserController.create(req, res);
  });
};
