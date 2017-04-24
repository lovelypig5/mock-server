var mock = require('../service/mock');

class BaseApi {

    async initMock(userId) {
        await mock.fetchProjects(userId);
        await mock.fetchMockApis(userId);
    }

}

module.exports = BaseApi;
