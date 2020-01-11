require("dotenv").config();
const express = require("express");
const app = require("../config");
// const middleware = require("../config");

// const app = express();

// app.use(middleware(express));
// const app = middleware(express);

// module.exports = app;
module.exports = app(express);
