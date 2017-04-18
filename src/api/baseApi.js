'use strict';

var mock = require('../service/mock');

class BaseApi {

    updateProject(userId) {
        mock.fetchProjects(userId, true);
    }

    updateMockApis(userId) {
        mock.fetchMockApis(userId, true);
    }

}

module.exports = BaseApi;
