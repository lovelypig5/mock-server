var expect = require('chai').expect,
    _ = require('lodash'),
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
        it('create empty project should be error', (done) => {
            var project = {};
            projectDao.createProject(project).then(null, (err) => {
                expect(err).to.have.any.keys('errors');
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('create project without name should be error', (done) => {
            var project = {
                name: '123',
                desc: '',
                beginPath: '/tt',
                proxy: 'http://www.baidu.com',
                isPublic: 1,
                createTime: Date.now(),
                modifyTime: Date.now(),
                userId: user.id
            };
            projectDao.createProject(_.omit(project, ['name'])).then(null, ({ errors }) => {
                expect(errors['name'].message).to.equal('Path `name` is required.');
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('create project without beginPath should be error', (done) => {
            var project = {
                name: '123',
                desc: '',
                beginPath: '/tt',
                proxy: 'http://www.baidu.com',
                isPublic: 1,
                createTime: Date.now(),
                modifyTime: Date.now(),
                userId: user.id
            };
            projectDao.createProject(_.omit(project, ['beginPath'])).then(null, ({ errors }) => {
                expect(errors['beginPath'].message).to.equal(
                    'Path `beginPath` is required.');
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('create project without proxy should be error', (done) => {
            var project = {
                name: '123',
                desc: '',
                beginPath: '/tt',
                proxy: 'http://www.baidu.com',
                isPublic: 1,
                createTime: Date.now(),
                modifyTime: Date.now(),
                userId: user.id
            };
            projectDao.createProject(_.omit(project, ['proxy'])).then(null, ({ errors }) => {
                expect(errors['proxy'].message).to.equal('Path `proxy` is required.');
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('create project without userId should be error', (done) => {
            var project = {
                name: '123',
                desc: '',
                beginPath: '/tt',
                proxy: 'http://www.baidu.com',
                isPublic: 1,
                createTime: Date.now(),
                modifyTime: Date.now(),
                userId: user.id
            };
            projectDao.createProject(_.omit(project, ['userId'])).then(null, ({ errors }) => {
                expect(errors['userId'].message).to.equal('Path `userId` is required.');
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
