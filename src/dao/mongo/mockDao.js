'use strict';

var BaseDao = require('./baseDao');

class MockDao extends BaseDao {

    constructor() {
        super();

        this.Entity = this.db.model('mockSet', this.schema.mockset);
    }

    async createMockApi(mock) {
        var entity = new this.Entity(mock);
        try {
            await entity.save();
            return this.model(200, entity);
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "保存失败");
        }
    }

    async listMockApis(projectId, userId) {
        try {
            var docs = await this.Entity.find({
                "projectId": projectId,
                "userId": userId
            }).exec();
            return this.model(200, docs);
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "获取接口列表失败");
        }
    }

    async modifyMockApi(id, userId, update) {
        try {
            var docs = await this.Entity.update({
                _id: id,
                userId: userId
            }, update);
            if (docs.n == 1) {
                return this.model(200, '修改接口成功');
            } else {
                return this.model(500, '修改接口失败');
            }
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "修改接口失败");
        }
    }

    async getMockApis(id, userId) {
        var conditions = {
            userId: userId
        };
        if (id) {
            conditions._id = id;
        }

        try {
            var docs = await this.Entity.find(conditions).exec();
            return this.model(200, docs);
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "获取项目详情失败");
        }
    }

    async deleteMockApi(id, userId) {
        try {
            var docs = await this.Entity.remove({
                _id: id,
                userId: userId
            });
            if (docs.result.n == 1) {
                return this.model(200, "删除接口成功");
            } else {
                return this.model(500, "删除接口失败");
            }
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "删除接口失败");
        }
    }

}

module.exports = new MockDao();
