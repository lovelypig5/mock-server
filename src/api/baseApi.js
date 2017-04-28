var config = require('../config'),
    modelUtils = require(`../model/${config.DB.dialect}/utils`),
    mock = require('../service/mock');

class BaseApi {

    getModel(name) {
        return modelUtils.getModels(name);
    }

}

module.exports = BaseApi;
