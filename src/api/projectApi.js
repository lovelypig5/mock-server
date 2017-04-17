'use strict';

var config = require('../config/db'),
    projectDao = require(`../dao/${config.db.dialect}/projectDao`),
    BaseApi = require('./baseApi');

class ProjectApi extends BaseApi {

    async createProject(req, res) {
        var {
            name,
            desc,
            isPublic = 1,
            beginPath,
            proxy
        } = req.body;

        if (!name || !beginPath || !proxy) {
            return res.status(500).send('缺少参数');
        }

        var data = {
            name,
            desc,
            isPublic,
            beginPath,
            proxy,
            modifyTime: new Date(),
            userId: req.session.user.id
        }

        var result = await projectDao.createProject(data);
        if (result.status == 200) {
            super.updateProject();
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

    async listProject(req, res) {
        var id = req.params.id || null;
        var result = await projectDao.listProject(id, req.session.user.id);
        if (result.status == 200) {
            return res.status(result.status).json(result.ret);
        } else {
            res.status(result.status).send(result.ret);
        }
    }

    async modifyProject(req, res) {
        if (!req.params.id) {
            return res.status(500).send("缺少参数");
        }

        var {
            _id,
            name,
            desc,
            isPublic = 1,
            beginPath,
            proxy
        } = req.body;

        if (!_id || !name || !beginPath || !proxy) {
            return res.status(500).send('缺少参数');
        }

        var update = {
            $set: {
                _id,
                name,
                desc,
                isPublic,
                beginPath,
                proxy
            }
        };

        var result = await projectDao.modifyProject(req.params.id, req.session.user.id, update);
        if (result.status == 200) {
            super.updateProject();
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

    async deleteProject(req, res) {
        if (!req.params.id) {
            return res.status(500).send("缺少参数");
        }

        var result = await projectDao.deleteProject(req.params.id, req.session.user.id);
        if (result.status == 200) {
            super.updateProject();
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

}

var projectApi = new ProjectApi();
module.exports = [{
    method: 'post',
    route: '/_system/project',
    func: projectApi.createProject
}, {
    method: 'get',
    route: '/_system/project/list',
    func: projectApi.listProject
}, {
    method: 'get',
    route: '/_system/project/:id',
    func: projectApi.listProject
}, {
    method: 'post',
    route: '/_system/project/:id',
    func: projectApi.modifyProject
}, {
    method: 'delete',
    route: '/_system/project/:id',
    func: projectApi.deleteProject
}];
