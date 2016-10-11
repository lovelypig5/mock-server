var httpProxy = require('http-proxy'),
    logger = require('../logger'),
    proxy = httpProxy.createProxyServer();

proxy.on('open', (proxySocket) => {
    logger.info("proxy open");
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {});

proxy.on('proxyRes', (proxyRes, req, res) => {});

proxy.on('end', (proxyRes, req, res) => {});

proxy.on('error', (e, req, res) => {
    logger.error(e);
});

module.exports = proxy;
