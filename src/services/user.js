import { Pipeline } from "../usercases/user";

module.exports = app => {
  app.get("/User", (req, res) => {
    const _Pipeline = new Pipeline();

    console.log(_Pipeline);
  });

  app.post("/user", (req, res) => {
    //pipeline.create(req, res);
  });
};
