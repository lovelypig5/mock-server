var httpProxy = require('http-proxy'),
    logger = require('../logger'),
    proxy = httpProxy.createProxyServer();

proxy.on('open', (proxySocket) => {
    logger.info("proxy open");
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    logger.info("proxy request send ");
    if ((req.method == "POST" || req.method == "PATCH") && req.body) {
        proxyReq.write(req.body);
        proxyReq.end();
    }
});

proxy.on('proxyRes', (proxyRes, req, res) => {
    logger.info("proxy response");
});

proxy.on('end', (proxyRes, req, res) => {
    logger.info("proxy end");
});

proxy.on('error', (e, req, res) => {
    logger.error(e);
});

module.exports = proxy;
