'use strict';

var express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    logger = require('../logger'),
    transformerProxy = require('transformer-proxy'),
    mock = require('../service/mock'),
    proxy = require('../proxy'),
    utils = require('../utils'),
    Mock = require('mockjs');

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
router.use(async(req, res, next) => {
    let userId = req.session.user.id;
    if (!userId) {
        next();
    }

    let url = decodeURI(req.url);
    let path = decodeURI(req.path);
    let beginPath = (url.match(/\/\w+/) || [""])[0];
    let author = req.headers.author;
    if (author) {
        beginPath = author;
        delete req.headers.author;
    }
    var project = await mock.getProjects(beginPath, userId);
    if (project) {
        var normalApis = await mock.getNormalApis(project._id, userId) || {};
        var regApis = await mock.getRegApis(project._id, userId);
        var api = normalApis[path];
        if (api && api.type == req.method) { // match normal
            if (api.dataHandler == "over") {
                let data = JSON.parse(api.result);
                return res.json(Mock.mock(data));
            } else {
                req.proxy = project.proxy;
                req._extendData = api.result;
                next();
            }
        } else if (regApis) { // match reg
            regApis.forEach((api) => {
                if (new RegExp(api.regexp).test(url) && api.type == req.method) {
                    if (api.dataHandler == "over") {
                        let data = JSON.parse(api.result);
                        return res.json(Mock.mock(data));
                    } else {
                        req.proxy = project.proxy;
                        req._extendData = api.result;
                        next();
                    }
                }
            });
            if (url.indexOf(':') != -1) {
                return res.status(200).json({
                    result: "error happens! have you replace your parameter? "
                });
            }
            next();
        } else {
            next();
        }
    }
    next();
});

// override data
router.use(transformerProxy((data, req, res) => {
    if (req._extendData) {
        var ret = JSON.parse(data);
        var extend = JSON.parse(req._extendData);
        ret = _.merge(ret, Mock.mock(extend));

        return JSON.stringify(ret);
    }

    return data;
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
