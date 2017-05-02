var expect = require('chai').expect,
    config = require('../../src/config'),
    userDao = require(`../../src/dao/${config.DB.dialect}/userDao`),
    Errors = require('../../src/error');

var UserDaoTest = (registerUser) => {

    describe('Test Functions in UserDao', () => {
        describe('#login()', () => {
            it('login with empty object', (done) => {
                var user = {};
                userDao.login(user).then(null, (err) => {
                    expect(err).to.be.instanceof(TypeError);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
            it('login with empty userName', (done) => {
                var user = { userName: '' };
                userDao.login(user).then(null, (err) => {
                    expect(err).to.be.instanceof(TypeError);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
            it('login with empty password', (done) => {
                var user = { password: '' };
                userDao.login(user).then(null, (err) => {
                    expect(err).to.be.instanceof(Errors.AuthenticateFail);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
            it('login with sql inject parameters', (done) => {
                var user = { userName: 'test', password: 'a or 1=1' };
                userDao.login(user).then(null, (err) => {
                    expect(err).to.be.instanceof(Errors.AuthenticateFail);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
            it('login with given user', (done) => {
                userDao.login(registerUser).then((result) => {
                    expect(result.toJSON()).to.have.all.keys('_id', 'name', 'salt');
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
        });
    });
}

module.exports = UserDaoTest;
