var config = require('../config'),
    logger = require('../logger'),
    MESSAGES = require('../config/message'),
    Errors = require('../error'),
    utils = require('../utils'),
    modelUtils = require(`../model/${config.DB.dialect}/utils`);

class BaseApi {

    getModel(name) {
        return modelUtils.getModels(name);
    }

    handleErr(err) {
        if (err instanceof Errors.NotFound) {
            return utils.ajaxModel(400, err.message);
        }
        if (err instanceof Errors.Exist) {
            return utils.ajaxModel(400, err.message);
        }
        if (err instanceof Errors.NotEnough) {
            return utils.ajaxModel(400, err.message);
        }
        if (err instanceof Errors.DataError) {
            return utils.ajaxModel(200, err.message);
        }
        if (err instanceof Errors.UnknownError) {
            return utils.ajaxModel(500, err.message);
        }
        if (err instanceof Errors.AuthenticateFail) {
            return utils.ajaxModel(401, err.message);
        }

        logger.error(err);
        return utils.ajaxModel(500, MESSAGES.SERVER_ERROR);
    }

}

module.exports = BaseApi;
