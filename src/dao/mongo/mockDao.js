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
            return this.model(200, "保存成功");
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "保存失败");
        }
    }

    async listMockApis(projectId) {
        try {
            var docs = await this.Entity.find({
                "projectId": projectId
            }).exec();
            return this.model(200, docs);
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "获取接口列表失败");
        }
    }

    async modifyMockApi(id, update) {
        try {
            var docs = await this.Entity.update({
                _id: id
            }, update);
            return this.model(200, docs);
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "修改接口失败");
        }
    }

    async getMockApis(id) {
        var conditions = null;
        if (id) {
            conditions = {
                "_id": id
            }
        }

        try {
            var docs = await this.Entity.find(conditions).exec();
            return this.model(200, docs);
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "获取项目详情失败");
        }
    }

    async deleteMockApi(id) {
        try {
            var docs = await this.Entity.remove({
                _id: id
            });
            return this.model(200, docs);
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "删除接口失败");
        }
    }

}

module.exports = new MockDao();
