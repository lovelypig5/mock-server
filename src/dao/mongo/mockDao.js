var BaseDao = require('./baseDao'),
    projectDao = require('./projectDao'),
    Errors = require('../../error');

class MockDao extends BaseDao {

    constructor() {
        super();
        this.Entity = this.db.model('mockSet', this.schema.mockset);
    }

    async createMockApi(mockapi) {
        var projects;
        try {
            projects = projectDao.listProject(mockapi.projectId, mockapi.userId);
        } catch (err) {
            this.logger.error(err);
            throw new Errors.UnknownError('未知错误，请联系管理员！');
        }

        if (projects.length == 1) {
            var entity = new this.Entity(mockapi);
            await entity.save();
            return entity;
        } else {
            throw new Errors.NotFound('不存在的项目');
        }
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

    async modifyMockApi(id, mockapi) {
        var projects;
        try {
            projects = projectDao.listProject(mockapi.projectId, mockapi.userId);
        } catch (err) {
            this.logger.error(err);
            throw new Errors.UnknownError('未知错误，请联系管理员！');
        }

        if (projects.length == 1) {
            var docs = await this.Entity.update({
                _id: id,
                userId: mockapi.userId
            }, {$set: mockapi});
            if (docs.n == 1) {
                return '修改接口成功';
            } else {
                this.logger.error(`接口修改失败，未知原因，请联系管理员。接口ID: ${id}, 用户ID: ${userId}`);
                return new Errors.UnknownError(`接口修改失败，未知原因，请联系管理员。接口ID: ${id}, 用户ID: ${userId}`);
            }
        } else {
            throw new Errors.NotFound('不存在的项目');
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

    async getAllMockApis() {
        return this.Entity.find().exec();
    }

    async deleteMockApi(id, userId) {
        var docs = await this.Entity.remove({_id: id, userId: userId});
        if (docs.result.n == 1) {
            return "删除接口成功";
        } else {
            this.logger.error(`接口删除失败，未知原因，请联系管理员。接口ID: ${id}, 用户ID: ${userId}`);
            return new Errors.UnknownError(`接口删除失败，未知原因，请联系管理员。接口ID: ${id}, 用户ID: ${userId}`);
        }
    }

}

module.exports = new MockDao();
