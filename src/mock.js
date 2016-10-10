'use strict';

var config = require('./config/db'),
    logger = require('./logger'),
    mockDao = require(`./dao/${config.db.dialect}/mockDao`),
    projectDao = require(`./dao/${config.db.dialect}/projectDao`),
    mocklist = [];

var option = {
    headers: {
        'Cache-Control': 'no-cache'
    },
    statusCode: 200,
    cookies: [],
    timeout: 0
};

class Mock {

    constructor() {
        mockDao.getMockApis().then((docs) => {
            this.projectlist = docs;
        })
        projectDao.listProject().then((docs) => {
            this.apilist = docs;
        })
    }

    handleApi(req, res, next) {
        console.log(req.url);
        // set header
        res.set(option.headers);

        var type = option.type;
        // set Content-Type
        if (type) {
            res.type(type);
        }
        // set status code
        res.status(option.statusCode);
        // set cookies
        option.cookies.forEach((item, index) => {
            var name = item.name;
            var value = item.value;
            delete item.name;
            delete item.value;
            res.cookie(name, value, item);
        });

        next();

        // // do result
        // if (util.isFunction(option.result)) {
        //     option.result(req, res, next);
        // } else if (util.isArray(option.result) || util.isObject(option.result)) {
        //     !type && res.type('json');
        //     res.json(option.result);
        // } else {
        //     !type && res.type('text');
        //     res.send(option.result.toString());
        // }
    }

}

module.exports = new Mock();
