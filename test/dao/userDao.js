var config = require('../../src/config'),
    userDao = require(`../../src/dao/${config.DB.dialect}/userDao`);

describe('UserDao', () => {
    describe('#login()', () => {
        it('should login without error', (done) => {
            userDao.login({}).then((result) => {
                done(result);
            }, (err) => {
                done(err);
            });
        });
    });
});
