'use strict';

var mock = require('../service/mock');

class BaseApi {

    updateProject() {
        mock.fetchProjects();
    }

    updateMockApis() {
        mock.fetchMockApis();
    }

}

module.exports = BaseApi;
