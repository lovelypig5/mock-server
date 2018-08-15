var httpProxy = require( "http-proxy" ),
    logger = require( "../logger" ),
    utils = require( "../utils" ),
    proxy = httpProxy.createProxyServer();

proxy.on( "open", ( proxySocket ) => {
    logger.info( "proxy open" );
} );

proxy.on( "proxyReq", ( proxyReq, req, res, options ) => {
    logger.info( `proxy to ${req.proxy + req.url}` );
    req.timer = utils.getTimer();
} );

proxy.on( "proxyRes", ( proxyRes, req, res ) => {} );

proxy.on( "end", ( proxyRes, req, res ) => {
    utils.getTimer( req.timer );
} );

proxy.on( "error", ( e, req, res ) => {
    logger.error( e );
} );

module.exports = proxy;
