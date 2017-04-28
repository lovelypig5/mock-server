var _ = require('lodash'),
    models = require('.');

class Utils {

    getModels(modelName) {
        var _models = {};
        models.forEach(({name, model}) => {
            if (modelName && modelName != name) {
                return;
            }
            var _model = {};
            _.forEach(model, (T, key) => {
                if (typeof T === 'function') {
                    _model[key] = T();
                } else {
                    _model[key] = T.type(T.default);
                }
            });
            _models[name] = _model;
        });

        if (modelName) {
            return _models[modelName];
        } else {
            return _models;
        }
    }
}

module.exports = new Utils();
