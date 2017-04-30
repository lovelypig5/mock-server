var _ = require('lodash'),
    BaseDao = require('./baseDao'),
    Errors = require('../../error'),
    crypto = require('crypto'),
    hash = crypto.createHash('md5');

class UserDao extends BaseDao {

    constructor() {
        super();
        this.Entity = this.db.model('user', this.schema.user);
    }

    async login({ userName, password }) {
        var conditions = {
            name: userName,
            password: password
        };
        var docs = await this.Entity.find(conditions).exec();
        if (docs.length == 0) {
            throw new Errors.AuthenticateFail('用户名或者密码错误');
        } else if (docs.length == 1) {
            return _.pick(docs[0], ['id', 'name']);
        } else {
            throw new Errors.UnknownError('未知错误,请联系管理员');
        }
    }

    async register({ userName, password }) {
        var user = new this.Entity({
            userName,
            password: hash.update(password),
            salt: Math.floor(Math.random() * 1000000)
        })

        //TODO do register
    }
}

module.exports = new UserDao;
