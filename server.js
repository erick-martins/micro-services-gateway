var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const generalServiceProxyV1 = httpProxy('http://localhost:3001');

app.all('/v1/general/*', (req, res, next) => {
    req.url = req.url.split('/v1/general')[1];
    generalServiceProxyV1(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);