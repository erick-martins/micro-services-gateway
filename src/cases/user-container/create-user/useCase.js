const User = require("../../../schemas");
const EventEmitter = require("events");

const factory = require("error-factory");

const ValidationError = factory("ValidationError", {
  Event: "create-user.ValidationError",
  message: factory.ErrorProperty({
    writable: false
  })
});

module.exports = ({ password, username }) => {
  const mediator = new EventEmitter();

  const check = value =>
    value ? Promise.resolve(value) : Promise.reject(ValidationError());

  const emitValidationError = err =>
    mediator.emit("create-user.ValidationError", err);

  check(username)
    .then(() => check(password))
    .catch(ValidationError, emitValidationError);

  // const validatebody = () =>
  //   body ? Promise.resolve(body) : Promise.reject(ErrorNotFound());

  // const passwordIsValue = () =>
  //   body.password
  //     ? Promise.resolve(body.password)
  //     : Promise.reject(BodyNotValid());

  // const emitResponseNotFound = err => {
  //   console.log("Emit : CreateUser.responseNotFound");
  //   mediator.emit("CreateUser.responseNotFound", err);
  // };

  // const emitBodyNotValid = err => {
  //   console.log("Emit : CreateUser.BodyNotValid");
  //   mediator.emit("CreateUser.BodyNotValid", err);
  // };

  // const createUser = (body, res) => {
  //   bcrypt.hash(body.password, 10, function(err, hash) {
  //     body.password = hash;
  //     User.create(body)
  //       .then(result => {
  //         res.status(200).json({ Message: "Create user" });
  //       })
  //       .catch(error => {
  //         res.status(412).json({ Message: error.Message });
  //       });
  //   });
  // };

  // validatebody()
  //   .then(passwordIsValue)
  //   .then(createUser)
  //   .catch(ErrorNotFound, emitResponseNotFound)
  //   .catch(BodyNotValid, emitBodyNotValid)
  //   .catch(console.error);

  return mediator;
};
