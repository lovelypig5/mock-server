'use strict';

var config = require('../config'),
    projectDao = require(`../dao/${config.DB.dialect}/projectDao`),
    BaseApi = require('./baseApi'),
    utils = require('../utils');

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
        if (!utils.isUrl(proxy)) {
            return res.status(500).send('反向代理地址有误');
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
        if (!utils.isUrl(proxy)) {
            return res.status(500).send('反向代理地址有误');
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
    route: `/${config.APIPATH}/project`,
    func: projectApi.createProject
}, {
    method: 'get',
    route: `/${config.APIPATH}/project/list`,
    func: projectApi.listProject
}, {
    method: 'get',
    route: `/${config.APIPATH}/project/:id`,
    func: projectApi.listProject
}, {
    method: 'post',
    route: `/${config.APIPATH}/project/:id`,
    func: projectApi.modifyProject
}, {
    method: 'delete',
    route: `/${config.APIPATH}/project/:id`,
    func: projectApi.deleteProject
}];
