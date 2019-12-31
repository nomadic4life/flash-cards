require("dotenv").config();
const express = require("express");
const middleware = require("../config");
const app = express();

app.use(middleware(express));

module.exports = app;
