var _ = require('lodash'),
    config = require('../config'),
    logger = require('../logger'),
    mockDao = require(`../dao/${config.DB.dialect}/mockDao`),
    mock = require('../service/mock'),
    BaseApi = require('./baseApi');

class MockApi extends BaseApi {

    async createMockApi(req, res) {
        var model = super.getModel('mockset');
        var mockapi = Object.assign(model, _.pick(req.body, [
            'result',
            'desc',
            'active',
            'type',
            'param',
            'dataHandler',
            'menuId',
            'projectId',
            'url'
        ]));
        if (!mockapi.url) {
            return res.status(400).send("url不能为空");
        }
        if (!mockapi.projectId) {
            return res.status(400).send("缺少参数");
        }
        if (!mockapi.result) {
            return res.status(400).send("接口返回结果不能为空");
        }
        if (mockapi.url.indexOf("\/") !== 0) {
            return res.status(400).send("url前缀必须以/开头");
        }
        if (mockapi.url.indexOf("/_system") != -1) {
            return res.status(400).send("url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范");
        }

        mockapi.isreg = mockapi.url.includes(":");
        mockapi.userId = req.session.user._id;
        try {
            var result = await mockDao.createMockApi(mockapi);
            mock.updateMockApi(req.session.user._id, result);
            return res.status(200).json(result);
        } catch (err) {
            logger.error(err);
            return res.status(500).send("保存失败");
        }
    }

    async listMockApis(req, res) {
        if (!req.params.projectId) {
            return res.status(400).send("缺少参数");
        }
        try {
            var result = await mockDao.listMockApis(req.params.projectId, req.session.user._id);
            return res.status(200).json(result);
        } catch (err) {
            logger.error(err);
            return res.status(500).send("获取接口列表失败");
        }
    }

    async modifyMockApi(req, res) {
        if (!req.params.apiId) {
            return res.status(400).send("缺少参数");
        }
        var model = super.getModel('mockset');
        var mockapi = _.pick(Object.assign(model, req.body), [
            'result',
            'desc',
            'active',
            'type',
            'param',
            'dataHandler',
            'menuId',
            'projectId',
            'url'
        ]);

        if (!mockapi.url) {
            return res.status(400).send("url不能为空");
        }
        if (!mockapi.projectId) {
            return res.status(400).send("缺少参数");
        }
        if (!mockapi.result) {
            return res.status(400).send("接口返回结果不能为空");
        }
        if (mockapi.url.indexOf("\/") !== 0) {
            return res.status(400).send("url前缀必须以/开头");
        }
        if (mockapi.url.indexOf("/_system") != -1) {
            return res.status(400).send("url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范");
        }
        mockapi.isreg = mockapi.url.includes(":");
        mockapi.modifyTime = new Date();
        mockapi.userId = req.session.user._id;

        try {
            var result = await mockDao.modifyMockApi(mockapi);
            mock.updateMockApi(req.session.user._id, Object.assign({
                _id: req.params.apiId
            }, mockapi));
            return res.status(200).json(result);
        } catch (err) {
            logger.error(err);
            return res.status(500).send('修改接口失败');
        }
    }

    async getMockApi(req, res) {
        try {
            var result = await mockDao.getMockApis(req.params.apiId, req.session.user._id);
            return res.status(200).json(result);
        } catch (err) {
            logger.error(err);
            return res.status(500).send("获取接口失败");
        }
    }

    async deleteMockApi(req, res) {
        if (!req.params.apiId) {
            return res.status(400).send("缺少参数");
        }

        try {
            var mockapi = await mockDao.getMockApis(req.params.id, req.session.user._id);
            var result = await mockDao.deleteMockApi(req.params.apiId, req.session.user._id);
            mock.deleteMockApi(req.session.user._id, mockapi);
            return res.status(200).json(result);
        } catch (err) {
            logger.error(err);
            return res.status(500).send("删除接口失败");
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
