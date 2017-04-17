'use strict';

var BaseDao = require('./baseDao');

class ProjectDao extends BaseDao {

    constructor() {
        super();
        this.Entity = this.db.model('projectSet', this.schema.project);
    }

    async createProject(project) {
        var entity = new this.Entity(project);
        try {
            await entity.save();
            return this.model(200, entity);
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "保存失败");
        }
    }

    async listProject(id, userId) {
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
            return this.model(500, "获取项目失败");
        }
    }

    async modifyProject(id, userId, update) {
        try {
            var docs = await this.Entity.update({
                _id: id,
                userId: userId
            }, update);
            if (docs.n == 1) {
                return this.model(200, '修改项目详情成功');
            } else {
                return this.model(500, '修改项目详情失败');
            }
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "修改项目详情失败");
        }
    }

    async deleteProject(id, userId) {
        try {
            var docs = await this.Entity.remove({
                _id: id,
                userId: userId
            });
            if (docs.result.n == 1) {
                return this.model(200, "删除项目成功");
            } else {
                return this.model(500, "删除项目失败");
            }
        } catch (err) {
            this.logger.error(err);
            return this.model(500, "删除项目失败");
        }
    }

}

module.exports = new ProjectDao();
