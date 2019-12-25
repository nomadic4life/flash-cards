// import all middleware here
const routes = require("../routes/");

module.exports = (express, model) => {
  const middleware = express();
  middleware.use(express.json());
  // pass all middleware into middleware function
  middleware.get("/", (req, res) => {
    res.send("root route of api, sanity check. api up and running!");
  });
  middleware.use("/api", routes(express.Router(), model));
  return middleware;
};
