var config = require('../config'),
    modelUtils = require(`../model/${config.DB.dialect}/utils`),
    mock = require('../service/mock');

class BaseApi {

    getModel(name) {
        return modelUtils.getModels(name);
    }

    async initMock(userId) {
        await mock.fetchProjects(userId);
        await mock.fetchMockApis(userId);
    }

}

module.exports = BaseApi;
