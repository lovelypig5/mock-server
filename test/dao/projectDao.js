var expect = require('chai').expect,
    config = require('../../src/config'),
    userDao = require(`../../src/dao/${config.DB.dialect}/userDao`),
    projectDao = require(`../../src/dao/${config.DB.dialect}/projectDao`),
    Errors = require('../../src/error');

describe('ProjectDao', () => {

    var user = {};

    before((done) => {
        var _user = { userName: 'test', password: 'test' };
        userDao.login(_user).then((result) => {
            user = result;
            done();
        });
    })

    describe('#createProject()', () => {
        it('create project with no empty', (done) => {
            var project = {};
            projectDao.createProject(project).then(null,
                (err) => {
                    expect(err).to.not.be.ok;
                    done();
                }).catch((err) => {
                done(err);
            });
        });
    });
});
