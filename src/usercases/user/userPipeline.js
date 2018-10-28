import EventEmitter from "events";
import userAction from "./userAction";

class Pipeline extends EventEmitter {
  constructor() {
    super();
  }

  findAllUsers() {
    this.emit("FindAllUsers", userAction.FindAllUsers());
  }

  createUser(data) {
    this.emit("CreateUser", userAction.create(data));
  }
}

export default Pipeline;
