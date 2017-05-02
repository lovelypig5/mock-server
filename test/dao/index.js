var deps = ['./userDao', './projectDao'];
var expect = require('chai').expect,
    _ = require('lodash'),
    config = require('../../src/config'),
    userDao = require(`../../src/dao/${config.DB.dialect}/userDao`),
    Errors = require('../../src/error');

describe('User Register', () => {
    var registerUser = {
        name: 'ci_test',
        password: 'ci_test'
    }

    it('register with empty object', (done) => {
        var user = {};
        userDao.register(user).then(null, (err) => {
            expect(err).to.be.instanceof(TypeError);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('register with no name', (done) => {
        var user = {
            password: '123'
        };
        userDao.register(user).then(null, ({ errors }) => {
            expect(errors['name'].message).to.equal(
                'Path `name` is required.');
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('register with no password', (done) => {
        var user = {
            name: 'test'
        };
        userDao.register(user).then(null, (err) => {
            expect(err).to.be.instanceof(TypeError);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('register with not a string password', (done) => {
        var user = {
            name: 'test',
            password: 123
        };
        userDao.register(user).then(null, (err) => {
            expect(err).to.be.instanceof(TypeError);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('register a user', (done) => {
        userDao.register(registerUser).then((user) => {
            registerUser = Object.assign(registerUser, user.toJSON());
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('remove a empty user', (done) => {
        userDao.remove({}).then(null, (err) => {
            expect(err).to.be.instanceof(Errors.UnknownError);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('remove a user', (done) => {
        userDao.remove(registerUser).then((user) => {
            registerUser = _.omit(registerUser, ['_id', 'salt']);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    describe("Backend of Mock Server", () => {
        before((done) => {
            userDao.register(registerUser).then((user) => {
                registerUser = Object.assign(registerUser, user.toJSON());
                done();
            }).catch((err) => {
                done(err);
            });
        })

        deps.forEach((dep) => {
            var depends = require(dep);
            depends(registerUser);
        });

        after((done) => {
            userDao.remove(registerUser).then((user) => {
                registerUser = _.omit(registerUser, ['_id', 'salt']);
                done();
            }).catch((err) => {
                done(err);
            });
        })
    })

})
