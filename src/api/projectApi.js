'use strict';

var _ = require('lodash'),
    config = require('../config/db'),
    projectDao = require(`../dao/${config.db.dialect}/projectDao`),
    BaseApi = require('./baseApi');

class ProjectApi extends BaseApi {

    createProject(req, res) {
        var data = _.pick(req.body, ['name', 'desc', 'isPublic', 'beginPath', 'proxy']);
        data.modifyTime = new Date();

        projectDao.createProject(data).then((model) => {
            super.updateProject();
            return res.status(model.status).send(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

    listProject(req, res) {
        var id = req.params.id || null;
        projectDao.listProject(id).then((model) => {
            return res.status(model.status).send(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

    modifyProject(req, res) {
        if (!req.params.id) {
            return res.status(500).send("缺少参数");
        }
        var update = {
            $set: _.pick(req.body, ['_id', 'name', 'desc', 'isPublic', 'beginPath', 'proxy'])
        };
        projectDao.modifyProject(req.params.id, update).then((model) => {
            super.updateProject();
            return res.status(model.status).send(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

    deleteProject(req, res) {
        if (!req.params.id) {
            return res.status(500).send("缺少参数");
        }

        projectDao.deleteProject(req.params.id).then((model) => {
            super.updateProject();
            return res.status(model.status).send(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

}

var projectApi = new ProjectApi();
module.exports = [{
    method: 'post',
    route: '/umock/project',
    func: projectApi.createProject
}, {
    method: 'get',
    route: '/umock/project/list',
    func: projectApi.listProject
}, {
    method: 'get',
    route: '/umock/project/:id',
    func: projectApi.listProject
}, {
    method: 'post',
    route: '/umock/project/:id',
    func: projectApi.modifyProject
}, {
    method: 'delete',
    route: '/umock/project/:id',
    func: projectApi.deleteProject
}];
