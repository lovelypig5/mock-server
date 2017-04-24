'use strict';

var config = require('../config'),
    projectDao = require(`../dao/${config.DB.dialect}/projectDao`),
    mock = require('../service/mock'),
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
        if (isPublic == 1 && beginPath.indexOf("\/") !== 0) {
            return res.status(500).send('url前缀必须以/开头');
        }
        if (beginPath.indexOf("/_system") != -1) {
            return res.status(500).send('url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范');
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
            mock.updateProject(req.session.user.id, result.ret);
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
        if (isPublic == 1 && beginPath.indexOf("\/") !== 0) {
            return res.status(500).send('url前缀必须以/开头');
        }
        if (beginPath.indexOf("/_system") != -1) {
            return res.status(500).send('url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范');
        }
        if (!utils.isUrl(proxy)) {
            return res.status(500).send('反向代理地址有误');
        }

        var data = {
            name,
            desc,
            isPublic,
            beginPath,
            proxy
        }

        var update = {
            $set: data
        };

        var result = await projectDao.modifyProject(req.params.id, req.session.user.id, update);
        if (result.status == 200) {
            mock.updateProject(req.session.user.id, Object.assign({
                _id: req.params.id
            }, data));
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
            mock.deleteProject(req.session.user.id, req.params.id);
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
