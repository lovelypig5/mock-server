var httpProxy = require( "http-proxy" ),
    logger = require( "../logger" ),
    utils = require( "../utils" ),
    proxy = httpProxy.createProxyServer();

proxy.on( "open", ( proxySocket ) => {
    logger.info( "proxy open" );
} );

proxy.on( "proxyReq", ( proxyReq, req, res, options ) => {
    logger.info( `request to ${req.proxy + req.url}` );
    logger.debug( req.body );
    logger.debug( req.method );
    logger.debug( req.headers );
    req.timer = utils.getTimer();
} );

proxy.on( "proxyRes", ( proxyRes, req, res ) => {
    logger.info( `response from ${req.proxy + req.url}` );
    utils.getTimer( req.timer );
} );

proxy.on( "end", ( proxyRes, req, res ) => {} );

proxy.on( "error", ( e, req, res ) => {
    logger.error( e );
} );

module.exports = proxy;
