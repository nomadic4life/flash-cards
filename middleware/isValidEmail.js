const StatusError = require('../utils/errors');

const ifUserExist = async (req, res, next) => {
    const { email } = req.body;

    if (email.includes(' ')) {
        return next(new StatusError('Email must not contain spaces.', 400));
    }

    req.user.email = email;

    next();
};

module.exports = ifUserExist;