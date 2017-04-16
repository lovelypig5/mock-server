var _ = require('lodash'),
    config = require('../config/db'),
    userDao = require(`../dao/${config.db.dialect}/userDao`),
    BaseApi = require('./baseApi');

class UserApi extends BaseApi {

    login(req, res) {
        var body = req.body;
        var userName = body.userName;
        var password = body.password;
        if (!userName || !password) {
            return res.status(400).send('缺少参数');
        }

        req.session.user = {
            id: 1,
            name: 'Test'
        };
        res.status(200).json(req.session.user);
        // userDao.login(userName, password).then((user) => {
        //     req.session.user = user.ret;
        //     res.status(user.status).json(user.ret);
        // }, (err) => {
        //     var model = super.handleErr(err);
        //     res.status(model.status).send(model.ret);
        // });
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
