const StatusError = require('../utils/errors');

const isValidUsername = require('./isValidEmail');

describe('isValidEmail middleware', () => {
    it('should throw error for containing spaces', () => {
        const req = {
            body: {
                email: 'test user'
            }
        };

        const res = {};

        return isValidUsername(req, res, error => {
            expect(error).toBeInstanceOf(StatusError);
            expect(error.status).toBe(400);
            expect(error.statusMessage).toBe('Email must not contain spaces.');
        });
    });
});
