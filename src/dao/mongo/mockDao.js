'use strict';

var BaseDao = require('./baseDao');

class MockDao extends BaseDao {

    constructor() {
        super();
        this.Entity = this.db.model('mockSet', this.schema.mockset);
    }

    async createMockApi(mock) {
        var entity = new this.Entity(mock);
        await entity.save();
        return entity;
    }

    async listMockApis(projectId, userId) {
        return await this.Entity.find({
            projectId: projectId,
            userId: userId
        }, {
            userId: false,
            result: false
        }).exec();
    }

    async modifyMockApi(id, userId, mockapi) {
        var docs = await this.Entity.update({
            _id: id,
            userId: userId
        }, {$set: mockapi});
        if (docs.n == 1) {
            return this.model(200, '修改接口成功');
        } else {
            logger.error(`接口修改失败，未知原因，请联系管理员。接口ID: ${id}, 用户ID: ${userId}`);
            return `接口修改失败，未知原因，请联系管理员。接口ID: ${id}, 用户ID: ${userId}`;
        }
    }

    async getMockApis(id, userId) {
        var conditions = {
            userId: userId
        };
        if (id) {
            conditions._id = id;
        }

        return await this.Entity.find(conditions).exec();
    }

    async deleteMockApi(id, userId) {
        var docs = await this.Entity.remove({_id: id, userId: userId});
        if (docs.result.n == 1) {
            return "删除接口成功";
        } else {
            logger.error(`接口删除失败，未知原因，请联系管理员。接口ID: ${id}, 用户ID: ${userId}`);
            return `接口删除失败，未知原因，请联系管理员。接口ID: ${id}, 用户ID: ${userId}`;
        }
    }

}

module.exports = new MockDao();
