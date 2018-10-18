
const logger = require( "../logger" )

const logInject = async ( req, res, next ) => {
    // 挂载log
    req.log = logger;
    const reqid = req.header[ "x-request-id" ];
    logger.addContext( "reqid", reqid );
    const start = +new Date();
    logger.info( `[Start] ${req.method} ${req.url}` );
    await next();
    logger.info( `[Completed] ${res.statusCode} ${new Date() - start}ms | ${req.method} ${req.url}` );
}

module.exports = [
    {
        filter: logInject
    }
]