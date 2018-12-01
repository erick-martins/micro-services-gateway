var http = require('http');
var request = require('request');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const chalk = require("chalk");
var querystring = require('querystring');
const log = console.log;

const config = require("./config/config");
const services = config.services;

const authorization = ({
  accessToken,
  type
}) => {

  return new Promise((resolve, reject) => {
    const url = config.authorization[process.env.NODE_ENV] || config.authorization['production'];
    //console.log("url", url)
    if (url) {
      request({
          method: 'POST',
          url,
          form: {
            accessToken,
            type
          },
        },
        (err, res, body) => {
          if (err) {
            reject({
              error: "userpoll_not_found",
              message: "UserPool not found"
            })
          } else {
            //console.log("err", err);
            const json = JSON.parse(body);
            if (json.valid) {
              resolve(json.user)
            } else {
              reject(json.error)
            }
          }
        }
      );
    } else {
      reject({
        error: "userpoll_not_found",
        message: "UserPool not found"
      })
    }
  })

}

const makeService = (serviceName, service) => {
  let host = service.host || "http://localhost"
  host = service.port ? `${host}:${service.port}` : host;
  let runningService = httpProxy(host);

  app.all(`${service.prefix}/*`, (req, res, next) => {
    log(chalk.white.bgGreen("Request:"), req.url);
    if (service.removePrefixBeforeProxy) {
      req.url = req.url.split(service.prefix)[1];
    }
    //runningService(req, res, next);
    //return;
    // IF ROUTE MATCHES A SECURE ONE
    let matchAny = false;
    if (service.secureRoutes) {
      for (let i in service.secureRoutes) {
        secureRoutes = service.secureRoutes[i];
        //console.log("service.secureRoutes", secureRoutes)
        let regex = new RegExp(secureRoutes.regex, 'gi');
        let matches = req.url.match(regex) && (secureRoutes.methods.indexOf(req.method) > -1)

        if (matches) {
          matchAny = true;
          let accessToken = (req.headers.authorization || "").replace("Bearer", "").trim();
          if (!accessToken)
            return res.status(401).send({
              error: "token_not_found",
              message: "Access token not found"
            });
          for (let j in secureRoutes.userPools) {
            const responseHandler = user => {
              //console.log("Logged User", user);
              req.params._user = user;
              runningService(req, res, next);

            }
            const errorHandler = err => {
              return res.status(403).send({
                error: "access_denied",
                message: "You should be logged in",
                err
              });
            }
            authorization({
                accessToken,
                type: secureRoutes.userPools[j]
              })
              .then(responseHandler)
              .catch(errorHandler)
          }

        }
      }
    }
    if (!matchAny) {
      runningService(req, res, next);
    }

  })
  log(chalk.white.bgGreen('Running Service:'), chalk.blue(serviceName), 'at', chalk.yellow(host))
}



services.map(service => {
  const {
    name,
    env
  } = service
  makeService(name, env[process.env.NODE_ENV] || env['production'])
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
process.on('unhandledRejection', console.log.bind(console))
var server = http.createServer(app);
server.listen(3000);