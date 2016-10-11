'use strict';

var express = require('express'),
    router = express.Router(),
    logger = require('../logger'),
    transformerProxy = require('transformer-proxy'),
    mock = require('../service/mock'),
    proxy = require('../proxy');

router.use((req, res, next) => {
    logger.info('%s %s %s', req.method, req.url, req.path);
    next();
});

/**
 * handle all api not match system apis
 * @method handleApi
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
router.use((req, res, next) => {
    let url = decodeURI(req.url);
    let path = decodeURI(req.path);
    let beginPath = (url.match(/\/\w+/) || [""])[0];
    var author = req.headers.author;
    if (author) {
        beginPath = author;
        delete req.headers.author;
    }

    var project = mock.getProjects(beginPath);
    console.log(project);
    if (project) {
        var normalApis = mock.getNormalApis(project._id);
        var regApis = mock.getRegApis(project._id);
        var api = normalApis[path];
        if (api && api.type == req.method) { // match normal
            if (api.dataHandler == "over") {
                let data = JSON.parse(api.result);
                return res.json(data);
            } else {
                req.proxy = project.proxy;
            }
        } else if (regApis) { // match reg
            regApis.forEach((api) => {
                if (new RegExp(api.regexp).test(url) && api.type == req.method) {
                    if (api.dataHandler == "over") {
                        let data = JSON.parse(api.result);
                        return res.json(data);
                    } else {
                        req.proxy = project.proxy;
                    }
                }
            });
        }
    }

    next();
});
router.use(transformerProxy((data, req, res) => {
    //TODO
    var ret = JSON.parse(data);
    // utils.extendDeep(ret, {
    //     a: 0
    // });
    return JSON.stringify(ret);
}));
router.use((req, res, next) => {
    if (req.proxy) {
        proxy.web(req, res, {
            target: req.proxy,
            toProxy: true,
            changeOrigin: true
        });
    } else {
        next();
    }
});

var deps = [];
var ret = [{
    router: router,
    route: '/'
}];
deps.forEach((dep) => {
    ret.push(require(dep));
});

module.exports = ret;
