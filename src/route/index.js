var express = require('express'),
    router = express.Router(),
    logger = require('../logger'),
    transformerProxy = require('transformer-proxy'),
    mock = require('../proxy/mock');

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
    var project = projects[beginPath];
    if (project) {
        var normalApis = apilist.normal[project._id];
        var regApis = apilist.reg[project._id];
        var api = normalApis[path];
        if (api && api.type == req.method) { // match normal
            let data = JSON.parse(api.result);
            if (api.dataHandler == "over") {
                logger.info(api);
                logger.info('normal api is enabled');
                return res.json(data);
            } else {
                logger.info(api);
                logger.info('normal api is closed, do proxy');
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
    var ret = JSON.parse(data);
    utils.extendDeep(ret, {
        a: 0
    });
    return JSON.stringify(ret);
}));
router.use((req, res, next) => {
    if (req.proxy) {
        var headers = {};
        if ((req.method == "POST" || req.method == "PATCH") && req.body) {
            var data = JSON.stringify(req.body);
            req.body = data;
            if (req.headers['content-length']) {
                headers = {
                    "Content-Type": 'application/json;charset=UTF-8',
                    "Content-Length": data.length
                }
            }
        }
        proxy.web(req, res, {
            target: req.proxy,
            toProxy: true,
            changeOrigin: true,
            headers: headers
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
})

module.exports = ret;
