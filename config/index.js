// global middleware and controller configuration
const routes = require("../routes");

module.exports = express => {
  const app = express();

  app.use(express.json());

  app.use("/api", routes(express.Router()));

  app.get("/", (req, res) => {
    res.status(200).json({ message: "API up and running!" });
  });

  app.use((error, req, res, next) => {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server error" });
  });

  return app;
};
