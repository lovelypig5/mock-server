var expect = require('chai').expect,
    config = require('../../src/config'),
    userDao = require(`../../src/dao/${config.DB.dialect}/userDao`),
    Errors = require('../../src/error');

describe('UserDao', () => {
    describe('#login()', () => {
        it('login with empty object', (done) => {
            var user = {};
            userDao.login(user).then(null, (err) => {
                expect(err).to.be.instanceof(
                    Errors.AuthenticateFail
                );
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('login with empty userName', (done) => {
            var user = { userName: '' };
            userDao.login(user).then(null, (err) => {
                expect(err).to.be.instanceof(
                    Errors.AuthenticateFail
                );
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('login with empty password', (done) => {
            var user = { password: '' };
            userDao.login(user).then(null, (err) => {
                expect(err).to.be.instanceof(
                    Errors.AuthenticateFail
                );
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('login with sql inject parameters', (done) => {
            var user = { userName: 'test', password: 'a or 1=1' };
            userDao.login(user).then(null, (err) => {
                expect(err).to.be.instanceof(
                    Errors.AuthenticateFail
                );
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('login with given user', (done) => {
            var user = { userName: 'test', password: 'test' };
            userDao.login(user).then((result) => {
                expect(result).to.have.all.keys(
                    'id', 'name');
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
