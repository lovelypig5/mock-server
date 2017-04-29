var validator = require('validator'),
    _ = require('lodash'),
    config = require('../config'),
    logger = require('../logger'),
    projectDao = require(`../dao/${config.DB.dialect}/projectDao`),
    mock = require('../service/mock'),
    BaseApi = require('./baseApi'),
    utils = require('../utils');

class ProjectApi extends BaseApi {

    async createProject(req, res) {
        var model = super.getModel('project');
        var project = Object.assign(model, _.pick(req.body, ["name", "desc", "isPublic", "beginPath", "proxy"]));

        if (!project.name) {
            return res.status(400).send('项目名称不能为空');
        }
        if (!project.beginPath) {
            return res.status(400).send('api前缀或者header设置不能为空');
        }
        if (!project.proxy) {
            return res.status(400).send('反向代理地址不能为空');
        }
        if (project.isPublic == 1 && project.beginPath.indexOf("\/") !== 0) {
            return res.status(400).send('url前缀必须以/开头');
        }
        if (project.beginPath.indexOf("/_system") != -1) {
            return res.status(400).send('url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范');
        }
        if (!validator.isURL(project.proxy, {require_protocol: true})) {
            return res.status(400).send('反向代理地址有误');
        }

        project.modifyTime = new Date();
        project.userId = req.session.user.id;

        try {
            var result = await projectDao.createProject(project);
            mock.updateProject(req.session.user.id, result);
            return res.status(200).json(result);
        } catch (err) {
            var result = super.handleErr(err);
            return res.status(result.status).send(result.ret);
        }
    }

    async listProject(req, res) {
        var id = req.params.id || null;
        try {
            var result = await projectDao.listProject(id, req.session.user.id);
            return res.status(200).json(result);
        } catch (err) {
            var result = super.handleErr(err);
            return res.status(result.status).send(result.ret);
        }
    }

    async modifyProject(req, res) {
        if (!req.params.id) {
            return res.status(400).send("缺少参数");
        }

        var model = super.getModel('project');
        var project = _.pick(Object.assign(model, req.body), ['name', 'desc', 'isPublic', 'beginPath', 'proxy']);
        if (!project.name) {
            return res.status(400).send('项目名称不能为空');
        }
        if (!project.beginPath) {
            return res.status(400).send('api前缀或者header设置不能为空');
        }
        if (!project.proxy) {
            return res.status(400).send('反向代理地址不能为空');
        }
        if (project.isPublic == 1 && project.beginPath.indexOf("\/") !== 0) {
            return res.status(400).send('url前缀必须以/开头');
        }
        if (project.beginPath.indexOf("/_system") != -1) {
            return res.status(400).send('url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范');
        }
        if (!validator.isURL(project.proxy, {require_protocol: true})) {
            return res.status(400).send('反向代理地址有误');
        }
        project.modifyTime = new Date();
        project.userId = req.session.user.id;

        try {
            var result = await projectDao.modifyProject(req.params.id, req.session.user.id, project);
            mock.updateProject(req.session.user.id, Object.assign({
                _id: req.params.id
            }, project));
            return res.status(200).json(result);
        } catch (err) {
            var result = super.handleErr(err);
            return res.status(result.status).send(result.ret);
        }
    }

    async deleteProject(req, res) {
        if (!req.params.id) {
            return res.status(400).send("缺少参数");
        }

        try {
            var result = await projectDao.deleteProject(req.params.id, req.session.user.id);
            mock.deleteProject(req.session.user.id, req.params.id);
            return res.status(200).json(result);
        } catch (err) {
            var result = super.handleErr(err);
            return res.status(result.status).send(result.ret);
        }
    }

}

var projectApi = new ProjectApi();
module.exports = [
    {
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
    }
];
