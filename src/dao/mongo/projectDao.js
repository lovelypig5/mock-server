'use strict';

var BaseDao = require('./baseDao');

class ProjectDao extends BaseDao {

    constructor() {
        super();
        this.Entity = this.db.model('projectSet', this.schema.project);
    }

    createProject(project) {
        var entity = new this.Entity(project);
        return new Promise((resolve, reject) => {
            entity.save((err, data) => {
                if (err) {
                    this.logger.error(err);
                    reject(this.model(500, "保存失败"));
                } else {
                    resolve(this.model(200, "保存成功"));
                }
            });
        });
    }

    listProject(id) {
        var conditions = null;
        if (id) {
            conditions = {
                _id: id
            }
        }
        return new Promise((resolve, reject) => {
            this.Entity.find(conditions).exec((err, docs) => {
                if (err) {
                    this.logger.error(err);
                    reject(this.model(500, "获取项目失败"));
                } else {
                    resolve(this.model(200, docs));
                }
            });
        });
    }

    modifyProject(id, update) {
        return new Promise((resolve, reject) => {
            this.Entity.update({
                _id: id
            }, update, (err, docs) => {
                if (err) {
                    this.logger.error(err);
                    reject(this.model(500, "修改项目详情失败"));
                } else {
                    resolve(this.model(200, docs));
                }
            });
        });
    }

    deleteProject(id) {
        return new Promise((resolve, reject) => {
            this.Entity.remove({
                _id: id
            }, (err, docs) => {
                if (err) {
                    this.logger.error(err);
                    reject(this.model(500, "删除项目失败"));
                } else {
                    resolve(this.model(200, docs));
                }
            });
        });
    }

}

module.exports = new ProjectDao();
