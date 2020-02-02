const StatusError = require('../utils/errors');

const isValidEmail = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new StatusError('Must provide email.', 400));
    }

    if (email && email.includes(' ')) {
        return next(new StatusError('Email must not contain spaces.', 400));
    }

    req.user.email = email;
    next();
};

module.exports = isValidEmail;