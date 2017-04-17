'use strict';

var _ = require('lodash');

class Utils {
    /**
     * deep extend obj
     * @method extendDeep
     * @param  {[type]}         toObject [description]
     * @param  {[type]}         fromObj  [description]
     * @return {[type]}                  [description]
     */
    extendDeep(toObject, fromObj) {
        if (_.isObject(fromObj)) {
            if (!_.isObject(toObject)) {
                toObject = fromObj;
            } else {
                for (var key in fromObj) {
                    if (toObject[key] === undefined || this.isNotAOF(toObject[key])) {
                        toObject[key] = fromObj[key];
                    } else {
                        this.extendDeep(toObject[key], fromObj[key]);
                    }
                }
            }
        } else if (_.isArray(fromObj)) {
            if (!_.isArray(toObject)) {
                toObject = fromObj;
            } else if (fromObj.length == 1) {
                toObject.forEach((n, i) => {
                    if (this.isNotAOF(toObject[i])) {
                        toObject[i] = fromObj[0];
                    } else {
                        this.extendDeep(toObject[i], fromObj[0]);
                    }
                });
            } else {
                fromObj.forEach((n, i) => {
                    if (toObject.length <= i || this.isNotAOF(toObject[i])) {
                        toObject[i] = n;
                    } else {
                        this.extendDeep(toObject[i], n);
                    }
                });
            }
        } else if (this.isNotAOF(toObject)) {
            toObject = fromObj;
        }
    }

    isNotAOF(value) {
        return !(_.isFunction(value) || _.isArray(value) || _.isObject(value));
    }

    isUrl(url) {
        var match = /^(https?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
        return match.test(url);
    }
}

module.exports = new Utils();
