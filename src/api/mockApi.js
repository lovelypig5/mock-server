'use strict';

var _ = require('lodash'),
    config = require('../config/db'),
    mockDao = require(`../dao/${config.db.dialect}/mockDao`),
    BaseApi = require('./baseApi');

class MockApi extends BaseApi {

    createMockApi(req, res) {
        var data = _.pick(req.body, ['result', 'desc', 'active', 'type', 'param', 'respParam', 'dataHandler',
            'menuId', 'projectId'
        ]);
        if (req.body.url !== undefined) {
            data.url = req.body.url;
            data.isreg = data.url.includes(":");
        }
        data.modifyTime = new Date();

        mockDao.createMockApi(data).then((model) => {
            super.updateMockApis();
            return res.status(model.status).json(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

    listMockApis(req, res) {
        if (!req.params.projectId) {
            return res.status(500).send("缺少参数");
        }
        mockDao.listMockApis(req.params.projectId).then((model) => {
            return res.status(model.status).json(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

    modifyMockApi(req, res) {
        var data = _.pick(req.body, ['result', 'desc', 'active', 'type', 'param', 'respParam', 'dataHandler',
            'menuId', 'projectId'
        ]);
        if (req.body.url !== undefined) {
            data.url = req.body.url;
            data.isreg = data.url.includes(":");
        }
        data.modifyTime = new Date();

        mockDao.modifyMockApi(req.params.projectId, {
            $set: data
        }).then((model) => {
            super.updateMockApis();
            return res.status(model.status).json(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

    getMockApi(req, res) {
        if (!req.params.projectId) {
            return res.status(500).send("缺少参数");
        }

        mockDao.getProject(req.params.projectId).then((model) => {
            return res.status(model.status).json(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

    deleteMockApi(req, res) {
        if (!req.params.projectId) {
            return res.status(500).send("缺少参数");
        }

        mockDao.deleteMockApi(req.params.projectId).then((model) => {
            super.updateMockApis();
            return res.status(model.status).json(model.ret);
        }, (model) => {
            return res.status(model.status).send(model.ret);
        });
    }

}

var mockApi = new MockApi();
module.exports = [{
    method: 'post',
    route: '/umock/mockset',
    func: mockApi.createMockApi
}, {
    method: 'get',
    route: '/umock/list/:projectId',
    func: mockApi.listMockApis
}, {
    method: 'post',
    route: '/umock/mockset/:projectId',
    func: mockApi.modifyMockApi
}, {
    method: 'delete',
    route: '/umock/mockset/:projectId',
    func: mockApi.deleteMockApi
}];
