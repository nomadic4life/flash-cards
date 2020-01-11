const wrapAsync = require("../utils/wrapAsyncHandler");

const general = (req, res) => res.status(200).json({ data: req.data });
module.exports = {
  general: wrapAsync(general)
};
