var _ = require('lodash'),
    config = require('../config'),
    userDao = require(`../dao/${config.DB.dialect}/userDao`),
    BaseApi = require('./baseApi');

class UserApi extends BaseApi {

    async login(req, res) {
        var user = _.pick(req.body, ['userName', 'password']);
        if (!user.userName) {
            return res.status(400).send('用户名不能为空');
        }
        if (!user.password) {
            return res.status(400).send('密码不能为空');
        }

        try {
            var result = await userDao.login(user);
            res.status(200).json(result);
        } catch (err) {
            var result = super.handleErr(err);
            return res.status(result.status).send(result.ret);
        }
    }

    logout(req, res) {
        req.session.user = null;
        res.status(200).send({});
    }

    user(req, res) {
        res.status(200).json(req.session.user || {});
    }

    isLogin(req, res) {
        if (req.session.user) {
            res.status(200).json(req.session.user);
        } else {
            res.status(401).send('没有登录');
        }
    }
}

var userApi = new UserApi();

module.exports = [{
    method: 'post',
    route: '/_login',
    func: userApi.login
}, {
    method: 'post',
    route: '/_logout',
    func: userApi.logout
}, {
    method: 'get',
    route: '/_user',
    func: userApi.user
}, {
    method: 'get',
    route: '/_isLogin',
    func: userApi.isLogin
}]
