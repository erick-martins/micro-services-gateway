import config from "./config";

module.exports = app => {
  app.listen(config.port, () => {
    console.log(`Servidor executando na porta ${config.port.toString()}`);
  });
};
