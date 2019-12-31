// import all middleware here
const routes = require("../routes");

module.exports = express => {
  const middleware = express();

  middleware.use(express.json());

  middleware.use("/api", routes(express.Router()));

  middleware.get("/", (req, res) => {
    res.status(200).json({ message: "API up and running!" });
  });

  middleware.use((error, req, res, next) => {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server error" });
  });
  return middleware;
};
