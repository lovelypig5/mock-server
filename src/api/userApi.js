var _ = require('lodash'),
    config = require('../config/db'),
    userDao = require(`../dao/${config.db.dialect}/userDao`),
    BaseApi = require('./baseApi');

class UserApi extends BaseApi {

    async login(req, res) {
        var body = req.body;
        var userName = body.userName;
        var password = body.password;
        if (!userName || !password) {
            return res.status(400).send('缺少参数');
        }

        var result = await userDao.login(userName, password);
        if (result.status == 200) {
            req.session.user = result.ret;
            res.status(result.status).json(result.ret);
        } else {
            res.status(result.status).send(result.ret);
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
