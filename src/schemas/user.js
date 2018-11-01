var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema(
  {
    username: String,
    password: String,
    active: String
  },
  {
    versionKey: false
  }
);

export default mongoose.model("User", User);
