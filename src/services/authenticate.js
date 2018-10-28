import { User } from "../schemas/user";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import bcrypt from "bcrypt";

module.exports = app => {
  app.post("/authenticate", (req, res) => {
    User.findOne({ Login: req.body.Login }, (error, user) => {
      if (error) throw error;

      if (!user) {
        res.json({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, pass) {
          if (!pass) {
            res.json({
              success: false,
              message: "Authentication failed. Wrong password."
            });
          } else {
            const payload = { admin: user.Login, active: user.active };

            var token = jwt.sign(payload, config.superSecret, {
              expiresIn: 60
            });

            res.json({
              success: true,
              message: "this token expiration in 60 minuts!",
              token: token
            });
          }
        });
      }
    });
  });
};
