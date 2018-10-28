import User from "../../schemas/user";
import bcrypt from "bcrypt";
import EventEmitter from "events";

var inherits = require("util").inherits;

const userAction = {};

userAction.findAll = res => {
  User.find({}, (_error, result) => {
    if (error) res.json({ error: _error });
    res.json(result);
  });
};

userAction.create = (req, res) => {
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

inherits(userAction.findAll, EventEmitter);
inherits(userAction.create, EventEmitter);

export default userAction;
