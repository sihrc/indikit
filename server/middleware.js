/**
Adding Middleware
**/
var logger = require("morgan"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  session = require("express-session");

module.exports = function (app) {
  app.use(logger("indikit"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  }));
}
