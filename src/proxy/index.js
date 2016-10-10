var httpProxy = require('http-proxy'),
    logger = require('../logger'),
    proxy = httpProxy.createProxyServer();

proxy.on('open', (proxySocket) => {
    logger.info("proxy open");
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    if ((req.method == "POST" || req.method == "PATCH") && req.body) {
        proxyReq.write(req.body);
        proxyReq.end();
    }
});

proxy.on('proxyRes', (proxyRes, req, res) => {});

proxy.on('end', (proxyRes, req, res) => {
    logger.info("proxy end");
});

proxy.on('error', (e, req, res) => {
    // console.log(arguments);
});

module.exports = proxy;
