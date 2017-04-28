var BaseDao = require('./baseDao');

class ProjectDao extends BaseDao {

    constructor() {
        super();
        this.Entity = this.db.model('projectSet', this.schema.project);
    }

    async createProject(project) {
        var entity = new this.Entity(project);
        await entity.save();
        return entity;
    }

    async listProject(id, userId) {
        var conditions = {
            userId: userId
        };
        if (id) {
            conditions._id = id;
        }

        return await this.Entity.find(conditions, {userId: false}).exec();
    }

    async modifyProject(id, userId, project) {
        var docs = await this.Entity.update({
            _id: id,
            userId: userId
        }, {$set: project});
        if (docs.n == 1) {
            return '修改项目详情成功';
        } else {
            logger.error(`项目修改失败，未知原因，请联系管理员。项目ID: ${id}, 用户ID: ${userId}`);
            return `项目修改失败，未知原因，请联系管理员。项目ID: ${id}, 用户ID: ${userId}`;
        }
    }

    async deleteProject(id, userId) {
        var docs = await this.Entity.remove({_id: id, userId: userId});
        if (docs.result.n == 1) {
            return "删除项目成功";
        } else {
            logger.error(`项目删除失败，未知原因，请联系管理员。项目ID: ${id}, 用户ID: ${userId}`);
            return `项目删除失败，未知原因，请联系管理员。项目ID: ${id}, 用户ID: ${userId}`;
        }
    }

}

module.exports = new ProjectDao();
