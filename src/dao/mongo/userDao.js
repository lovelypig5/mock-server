var _ = require('lodash'),
    BaseDao = require('./baseDao');

class UserDao extends BaseDao {

    constructor() {
        super();

        this.Entity = this.db.model('user', this.schema.user);
    }

    async login(userName, password) {
        var conditions = {
            name: userName,
            password: password
        };
        try {
            var docs = await this.Entity.find(conditions).exec();
            if (docs.length == 0) {
                return this.model(401, '用户名或者密码错误');
            } else if (docs.length == 1) {
                return this.model(200, _.pick(docs[0], ['id', 'name']));
            } else {
                return this.model(500, '未知错误');
            }
        } catch (err) {
            this.logger.error(err);
            return this.model(500, err);
        }
    }
}

module.exports = new UserDao;
