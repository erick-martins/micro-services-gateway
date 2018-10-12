import User from "../models/UserSchema";
import bcrypt from "bcrypt";

const UserController = {};

UserController.findAll = function(res) {
  User.find({}, (error, result) => {
    res.json(result);
  });
};

UserController.create = function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    req.body.password = hash;
    User.create(req.body)
      .then(result => {
        res.status(200).json({ Message: "Create user" });
      })
      .catch(error => {
        res.status(412).json({ Message: error.Message });
      });
  });
};

module.exports = UserController;
