// import all middleware here
const routes = require("../routes/");

module.exports = express => {
  const middleware = express();
  // pass all middleware into middleware function
  middleware.use("/", routes(express.Router()));
  return middleware;
};
