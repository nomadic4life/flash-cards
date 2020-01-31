const StatusError = require('../utils/errors');
const { destination, filename, fileFilter } = require('../utils/uploads');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: destination,
  filename: filename
});

const upload = multer({
  storage: storage, limits: {
    fileSize: 1024 * 1024 * 4
  },
  fileFilter: fileFilter
}).single('avatar');

const uploadAvatar = async (req, res, next) => {

  // could make a test for error callback.
  // place error callback into var binding and pass in cb into upload
  upload(req, res, err => {
    if (err) {
      return next(new StatusError('Error with file upload.', 400));
    }
    next();
  });
}

module.exports = uploadAvatar;
