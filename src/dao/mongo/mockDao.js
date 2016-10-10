'use strict';

var BaseDao = require('./baseDao');

class MockDao extends BaseDao {

    constructor() {
        super();

        this.Entity = this.db.model('mockSet', this.schema.mockset);
    }

    createMockApi(mock) {
        var entity = new this.Entity(mock);
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

    listMockApis(projectId) {
        return new Promise((resolve, reject) => {
            this.Entity.find({
                "projectId": projectId
            }).exec((err, docs) => {
                if (err) {
                    this.logger.error(err);
                    reject(this.model(500, "获取接口列表失败"));
                } else {
                    resolve(this.model(200, docs));
                }
            });
        });
    }

    modifyMockApi(id, update) {
        return new Promise((resolve, reject) => {
            this.Entity.update({
                _id: id
            }, update, (err, docs) => {
                if (err) {
                    this.logger.error(err);
                    reject(this.model(500, "修改接口失败"));
                } else {
                    resolve(this.model(200, docs));
                }
            });
        });
    }

    getMockApis(id) {
        var conditions = null;
        if (id) {
            conditions = {
                "_id": id
            }
        }
        return new Promise((resolve, reject) => {
            this.Entity.find(conditions).exec((err, docs) => {
                if (err) {
                    this.logger.error(err);
                    reject(this.model(500, "获取项目详情失败"));
                } else {
                    resolve(this.model(200, docs));
                }
            });
        });
    }

    deleteMockApi(id) {
        return new Promise((resolve, reject) => {
            this.Entity.remove({
                _id: id
            }, (err, docs) => {
                if (err) {
                    this.logger.error(err);
                    reject(this.model(500, "删除接口失败"));
                } else {
                    resolve(this.model(200, docs));
                }
            });
        });
    }

}

module.exports = new MockDao();
