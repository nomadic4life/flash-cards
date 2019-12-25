const express = require("express");
const middleware = require("../config");
const app = express();

module.exports = model => {
  app.use(middleware(express, model));
  return app;
};
