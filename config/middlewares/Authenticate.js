import jwt from "jsonwebtoken";
import config from "../config";

module.exports = app => {
  app.use("/api", (req, res, next) => {
    if (req.headers.authorization) {
      jwt.verify(
        req.headers.authorization,
        config.superSecret,
        (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: "Failed to authenticate token."
            });
          } else {
            req.decoded = decoded;
            next();
          }
        }
      );
    } else {
      return res.status(403).send({
        success: false,
        message: "No token provided."
      });
    }

    return res.json({
      success: false,
      message: "Failed to authenticate token."
    });
  });
};
