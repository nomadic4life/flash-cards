const express = require("express");
// const middleware = require("./config/");
const routes = require("../routes/");
const app = express();

app.use("/", routes(express.Router()));

module.exports = app;
