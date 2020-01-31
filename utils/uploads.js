// let data = new Buffer.from(' ');

// req.on('data', function (chunk) {
//   data = Buffer.concat([data, chunk]);
// });

// req.on('end', function () {
//   req.rawBody = data;
//   next();
// });

// could make a test for this.
const fileFilter = (req, file, cb) => {
  const type = new Set(['image/jpeg', 'image/png']);
  const hasType = type.has(file.mimetype);
  const err = hasType ? null : new StatusError('avatar image needs to be jpeg or png filetype.', 400);
  cb(err, hasType);
}

// could make a test for this.
const filename = (req, file, cb) => {
  const { username } = req.user;
  const type = file.mimetype.split('/')[1];
  const avatar = username + '_' + file.fieldname + '.' + type;
  req.user.avatar = avatar;
  cb(null, avatar);
}

const destination = (req, file, cb) => {
  cb(null, './uploads/avatar');
}

module.exports = {
  destination,
  filename,
  fileFilter
}