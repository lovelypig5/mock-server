'use strict';

var _ = require('lodash'),
    config = require('../config'),
    mockDao = require(`../dao/${config.DB.dialect}/mockDao`),
    mock = require('../service/mock'),
    BaseApi = require('./baseApi');

var checkApi = () => {

}

class MockApi extends BaseApi {

    async createMockApi(req, res) {
        var {
            result,
            desc,
            active = true,
            type = 'GET',
            param = '{}',
            dataHandler = 'over',
            menuId = "",
            projectId,
            url
        } = req.body;

        if (!result || !projectId || !url) {
            return res.status(500).send("缺少参数");
        }
        if (url.indexOf("\/") !== 0) {
            return res.status(500).send("url前缀必须以/开头");
        }
        if (url.indexOf("/_system") != -1) {
            return res.status(500).send("url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范");
        }

        var data = {
            result,
            desc,
            active,
            type,
            param,
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
            mock.updateMockApi(req.session.user.id, result.ret);
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
            active,
            type,
            param,
            dataHandler,
            menuId,
            projectId,
            url
        } = req.body;

        if (!projectId || !url) {
            return res.status(500).send("缺少参数");
        }
        if (url.indexOf("\/") !== 0) {
            return res.status(500).send("url前缀必须以/开头");
        }
        if (url.indexOf("/_system") != -1) {
            return res.status(500).send("url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范");
        }

        var data = {
            desc,
            active,
            type,
            param,
            dataHandler,
            menuId,
            projectId,
            url,
            isreg: url.includes(":"),
            modifyTime: new Date(),
            userId: req.session.user.id
        }

        if (result) {
            data.result = result;
        }

        var result = await mockDao.modifyMockApi(req.params.apiId, req.session.user.id, {
            $set: data
        });
        if (result.status == 200) {
            mock.updateMockApi(req.session.user.id, Object.assign({
                _id: req.params.apiId
            }, data));
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

    async getMockApi(req, res) {
        var result = await mockDao.getMockApis(req.params.apiId, req.session.user.id);
        if (result.status == 200) {
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }

    async deleteMockApi(req, res) {
        var {
            projectId
        } = req.body;
        console.log(req.body);
        if (!projectId) {
            return res.status(500).send("缺少参数");
        }

        var result = await mockDao.deleteMockApi(req.params.apiId, req.session.user.id);
        if (result.status == 200) {
            mock.deleteMockApi(req.session.user.id, projectId, req.body);
            return res.status(result.status).json(result.ret);
        } else {
            return res.status(result.status).send(result.ret);
        }
    }
}

var mockApi = new MockApi();
module.exports = [{
    method: 'post',
    route: `/${config.APIPATH}/mockapi`,
    func: mockApi.createMockApi
}, {
    method: 'get',
    route: `/${config.APIPATH}/list/:projectId`,
    func: mockApi.listMockApis
}, {
    method: 'get',
    route: `/${config.APIPATH}/mockapi/:apiId`,
    func: mockApi.getMockApi
}, {
    method: 'post',
    route: `/${config.APIPATH}/mockapi/:apiId`,
    func: mockApi.modifyMockApi
}, {
    method: 'delete',
    route: `/${config.APIPATH}/mockapi/:apiId`,
    func: mockApi.deleteMockApi
}];
