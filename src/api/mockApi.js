'use strict';

var _ = require('lodash'),
    config = require('../config'),
    mockDao = require(`../dao/${config.DB.dialect}/mockDao`),
    BaseApi = require('./baseApi');

class MockApi extends BaseApi {

    async createMockApi(req, res) {
        var {
            result,
            desc,
            active = true,
            type = 'GET',
            param,
            respParam,
            dataHandler = 'over',
            menuId = "",
            projectId,
            url
        } = req.body;

        if (!result || !param || !respParam || !projectId || !url) {
            return res.status(500).send("缺少参数");
        }

        var data = {
            result,
            desc,
            active,
            type,
            param,
            respParam,
            dataHandler,
            menuId,
            projectId,
            url,
            isreg: url.includes(":"),
            modifyTime: new Date(),
            userId: req.session.user.id
        }

        var result = await mockDao.createMockApi(data);
        if (result.status == 200) {
            super.updateMockApis();
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

    async listMockApis(req, res) {
        if (!req.params.projectId) {
            return res.status(500).send("缺少参数");
        }

        var result = await mockDao.listMockApis(req.params.projectId, req.session.user.id);
        if (result.status == 200) {
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

    async modifyMockApi(req, res) {
        var {
            result,
            desc,
            active = true,
            type = 'GET',
            param,
            respParam,
            dataHandler = 'over',
            menuId = "",
            projectId,
            url
        } = req.body;

        if (!result || !param || !respParam || !projectId || !url) {
            return res.status(500).send("缺少参数");
        }

        var data = {
            result,
            desc,
            active,
            type,
            param,
            respParam,
            dataHandler,
            menuId,
            projectId,
            url,
            isreg: url.includes(":"),
            modifyTime: new Date(),
            userId: req.session.user.id
        }

        var result = await mockDao.modifyMockApi(req.params.projectId, req.session.user.id, {
            $set: data
        });
        if (result.status == 200) {
            super.updateMockApis();
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

    async getMockApi(req, res) {
        if (!req.params.projectId) {
            return res.status(500).send("缺少参数");
        }

        var result = await mockDao.getMockApis(req.params.projectId, req.session.user.id);
        if (result.status == 200) {
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

    async deleteMockApi(req, res) {
        if (!req.params.projectId) {
            return res.status(500).send("缺少参数");
        }

        var result = await mockDao.deleteMockApi(req.params.projectId, req.session.user.id);
        if (result.status == 200) {
            super.updateMockApis();
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }
}

var mockApi = new MockApi();
module.exports = [{
    method: 'post',
    route: `/${config.APIPATH}/mockset`,
    func: mockApi.createMockApi
}, {
    method: 'get',
    route: `/${config.APIPATH}/list/:projectId`,
    func: mockApi.listMockApis
}, {
    method: 'post',
    route: `/${config.APIPATH}/mockset/:projectId`,
    func: mockApi.modifyMockApi
}, {
    method: 'delete',
    route: `/${config.APIPATH}/mockset/:projectId`,
    func: mockApi.deleteMockApi
}];
