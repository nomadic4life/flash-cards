const { listResource } = require("../middleware");
const { general } = require("../controllers/general");

module.exports = router => {
  router.get("/list-all", listResource, general);
};
